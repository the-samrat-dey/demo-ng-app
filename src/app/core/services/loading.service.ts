import { Injectable, Signal, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { BehaviorSubject, Observable, delay, distinctUntilChanged } from 'rxjs';

export interface LoadingState {
  isLoading: boolean;
  loadingText?: string;
  requestCount: number;
}

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  // Private state management
  private loadingSubject = new BehaviorSubject<LoadingState>({
    isLoading: false,
    requestCount: 0,
  });

  // Public signals for reactive state
  readonly loading: Signal<LoadingState> = toSignal(
    this.loadingSubject.asObservable(),
    { initialValue: { isLoading: false, requestCount: 0 } }
  );

  // Debounced loading state to prevent flicker
  readonly debouncedLoading: Signal<LoadingState> = toSignal(
    this.loadingSubject.pipe(
      delay(200), // Prevent quick flashes for fast requests
      distinctUntilChanged((prev, curr) => prev.isLoading === curr.isLoading)
    ),
    { initialValue: { isLoading: false, requestCount: 0 } }
  );

  // Counter for concurrent requests
  private requestCounter = signal(0);

  start(loadingText?: string): void {
    const currentCount = this.requestCounter.update((count) => count + 1);

    this.loadingSubject.next({
      isLoading: true,
      loadingText,
      requestCount: currentCount,
    });
  }

  stop(): void {
    const currentCount = this.requestCounter.update((count) =>
      Math.max(0, count - 1)
    );

    if (currentCount === 0) {
      this.loadingSubject.next({
        isLoading: false,
        requestCount: 0,
      });
    }
  }

  // Reset loading state (useful for error scenarios)
  reset(): void {
    this.requestCounter.set(0);
    this.loadingSubject.next({
      isLoading: false,
      requestCount: 0,
    });
  }

  // Get current loading state as observable (if needed)
  getLoadingState(): Observable<LoadingState> {
    return this.loadingSubject.asObservable();
  }
}
