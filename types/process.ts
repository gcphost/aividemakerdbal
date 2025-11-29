// Process-related types
import { Process } from "../entities/Process";
import { ProcessEstimate } from "../entities/ProcessEstimate";

export type IProcess = Process;
export type NewProcess = Partial<Process>;

export type IProcessEstimate = ProcessEstimate;

export type ServiceType =
  | "video-generation"
  | "image-generation"
  | "audio-generation"
  | "description-generation"
  | "tts"
  | "video-compilation"
  | "thumbnail-generation"
  | "sound-generation"
  | "music-generation"
  | "video-extension";

export type UnitType = "character" | "token" | "image" | "second" | "minute" | "unit";

// Process types shared between app and socket-server
export type ProcessType =
  | "image-generation"
  | "ai-call"
  | "audio-generation"
  | "video-compilation"
  | "video-generation"
  | "video-generation-ai"
  | "video-extension-ai"
  | "timeline-generation"
  | "thumbnail-generation"
  | "music-generation"
  | "sound-generation"
  | "description-generation"
  | "content-generation";

export type ProcessStatus =
  | "pending"
  | "queued"
  | "processing"
  | "stopping"
  | "completed"
  | "failed"
  | "cancelled";

/**
 * Process group definition for aggregating related processes
 */
export interface ProcessGroup {
  groupId: string; // Format: {videoId}-{operationType} or semantic task name
  parentGroupId?: string; // For nested groups
  weight?: number; // Weight for progress calculation (defaults to 1)
  estimatedDuration?: number; // Estimated duration in milliseconds for predictive progress
}

/**
 * Step definition for a process
 */
export interface ProcessStep {
  name: string; // Human-readable step name (e.g., "Generating Images", "Creating Audio")
  weight?: number; // Optional weight for progress calculation (defaults to 1)
}

/**
 * Unified process update with step tracking
 */
export interface ProcessUpdate {
  processId: string;
  type?: ProcessType; // Process type (e.g., "ai-call", "image-generation")
  resourceId?: string; // Resource ID (e.g., chapterId, videoId)
  status: ProcessStatus;
  progress: number; // 0-100
  currentStep?: number; // Current step index (0-based)
  totalSteps?: number; // Total number of steps
  stepName?: string; // Name of current step
  stage?: string; // Stage name (e.g., "queued", "processing", "encoding")
  message: string; // Human-readable status message
  result?: any;
  error?: string;
  provider?: string; // TTS/Image provider (e.g., "openai", "gemini", "huggingface")
  model?: string; // Model name (e.g., "tts-1", "gemini-2.5-flash-tts")
  videoId?: string; // Video ID (for processes where resourceId is videoId, like generateChapters)
  videoSubject?: string; // Video subject/title (for display purposes)
  currentChapter?: number; // Current chapter number (for video generation processes)
  totalChapters?: number; // Total number of chapters (for video generation processes)
  metadata?: Record<string, any>; // Additional metadata (e.g., chunkIndex for audio regeneration)
  groupId?: string; // Group ID for aggregating related processes
  parentGroupId?: string; // Parent group ID for nested groups
  parentProcessId?: string; // Parent process ID for master/slave relationships
  isMaster?: boolean; // True for master processes, false for slave processes
  groupProgress?: number; // Overall group progress (0-100)
  groupCompleted?: number; // Number of completed processes in group
  groupTotal?: number; // Total number of processes in group
  groupMessage?: string; // Overall group message
  estimatedDuration?: number; // Estimated duration in milliseconds (null if unknown)
  elapsedTime?: number; // Elapsed time in milliseconds
  remainingTime?: number; // Estimated remaining time in milliseconds
}

/**
 * Process request
 */
export interface ProcessRequest {
  type: ProcessType;
  userId: string;
  resourceId: string;
  metadata: Record<string, any>;
  groupId?: string; // Group ID for aggregating related processes
  parentGroupId?: string; // Parent group ID for nested groups
  parentProcessId?: string; // Parent process ID for master/slave relationships
  isMaster?: boolean; // True for master processes, false for slave processes
  weight?: number; // Weight for progress calculation (defaults to 1)
  estimatedDuration?: number; // Estimated duration in milliseconds for predictive progress
}

/**
 * Process handler interface
 */
export interface ProcessHandler {
  handle(processId: string, request: ProcessRequest): Promise<any>;
  cancel?(processId: string): Promise<void>;
}
