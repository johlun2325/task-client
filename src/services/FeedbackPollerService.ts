import { apiService } from './ApiService';

class FeedbackPollerService {
  private pollingIntervals: number[] = [];
  private isPolling: boolean = false;
  private currentPollingIndex: number = 0;
  private callbacks: Set<() => void> = new Set();
  
  public startPolling(): void {
    console.log('Starting feedback polling sequence');
    
    this.stopPolling();
    
    this.currentPollingIndex = 0;
    this.isPolling = true;
    
    this.pollOnce();
    
    const intervals = [2000, 5000];
    
    intervals.forEach((delay, index) => {
      const timeoutId = window.setTimeout(() => {
        if (this.isPolling && this.currentPollingIndex === index) {
          this.pollOnce();
          this.currentPollingIndex++;
        }
      }, delay);
      
      this.pollingIntervals.push(timeoutId);
    });
  }
  
  public stopPolling(): void {
    this.isPolling = false;
    
    this.pollingIntervals.forEach(id => window.clearTimeout(id));
    this.pollingIntervals = [];
  }
  
  public subscribe(callback: () => void): () => void {
    this.callbacks.add(callback);
    return () => {
      this.callbacks.delete(callback);
    };
  }
  
  private async pollOnce(): Promise<void> {
    console.log(`Polling for feedback (attempt ${this.currentPollingIndex + 1})`);
    
    try {
      const feedback = await apiService.feedback.get();
      
      if (feedback && feedback.length > 0) {
        console.log(`Found ${feedback.length} feedback items`);
        this.notifyCallbacks();
      } else {
        console.log('No feedback found in this polling cycle');
      }
    } catch (error) {
      console.error('Error polling for feedback:', error);
    }
  }
  
  private notifyCallbacks(): void {
    this.callbacks.forEach(callback => {
      try {
        callback();
      } catch (error) {
        console.error('Error in feedback callback:', error);
      }
    });
  }
}

export const feedbackPoller = new FeedbackPollerService();
