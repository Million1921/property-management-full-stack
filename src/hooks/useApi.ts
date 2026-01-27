import { useQuery, useMutation, UseQueryOptions, UseMutationOptions } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import toast from 'react-hot-toast'

interface ApiOptions<T> {
  queryKey: string[]
  queryFn: () => Promise<T>
  options?: Omit<UseQueryOptions<T, AxiosError>, 'queryKey' | 'queryFn'>
}

interface MutationOptions<T, V> {
  mutationFn: (variables: V) => Promise<T>
  options?: Omit<UseMutationOptions<T, AxiosError, V>, 'mutationFn'>
  successMessage?: string
  errorMessage?: string
}

export function useApiQuery<T>({ queryKey, queryFn, options }: ApiOptions<T>) {
  return useQuery<T, AxiosError>({
    queryKey,
    queryFn,
    ...options,
  })
}

export function useApiMutation<T, V>({
  mutationFn,
  options,
  successMessage,
  errorMessage = 'Operation failed',
}: MutationOptions<T, V>) {
  return useMutation<T, AxiosError, V>({
    mutationFn,
    ...options,
    onSuccess: (data, variables, context) => {
      if (successMessage) {
        toast.success(successMessage)
      }
      options?.onSuccess?.(data, variables, context)
    },
    onError: (error, variables, context) => {
      const message = error.response?.data?.message || errorMessage
      toast.error(message)
      options?.onError?.(error, variables, context)
    },
  })
}