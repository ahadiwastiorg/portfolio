"use client"

import { useLoadingContext } from "@/components/providers/loading-provider"

/**
 * Convenience hook so components can simply call
 *   const { showLoading, hideLoading } = useLoading()
 */
export const useLoading = () => useLoadingContext()
