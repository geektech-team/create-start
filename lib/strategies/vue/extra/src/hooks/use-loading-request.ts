import { Ref, ref } from 'vue';

type Api<ResponseData, Params extends Array<unknown>> = (
  ...params: Params
) => Promise<ResponseData>;

interface AutoRequestOptions {
  // 定义一下初始状态
  loading?: boolean;
  // 接口调用成功时的回调
  onSuccess?: (data: unknown) => void;
}

type AutoRequestResult<ResponseData, Params extends Array<unknown>> = [
  Ref<boolean>,
  Api<ResponseData, Params>,
];

/* 控制loading状态的自动切换hook */
export function useLoadingRequest<
  ResponseData,
  Params extends unknown[] = unknown[],
>(
  api: Api<ResponseData, Params>,
  options?: AutoRequestOptions,
): AutoRequestResult<ResponseData, Params> {
  const { loading = false, onSuccess } = options || { loading: false };
  const requestLoading = ref(loading);
  const request: Api<ResponseData, Params> = (...params) => {
    requestLoading.value = true;
    return api(...params)
      .then(res => {
        onSuccess && onSuccess(res);
        return res;
      })
      .finally(() => {
        requestLoading.value = false;
      });
  };

  return [requestLoading, request];
}
