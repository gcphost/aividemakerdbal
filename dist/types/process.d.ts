import { Process } from "../entities/Process";
import { ProcessEstimate } from "../entities/ProcessEstimate";
export type IProcess = Process;
export type NewProcess = Partial<Process>;
export type IProcessEstimate = ProcessEstimate;
export type ServiceType = "video-generation" | "image-generation" | "audio-generation" | "description-generation" | "tts" | "video-compilation" | "thumbnail-generation" | "sound-generation" | "music-generation" | "video-extension";
export type UnitType = "character" | "token" | "image" | "second" | "minute" | "unit";
export type ProcessType = "image-generation" | "ai-call" | "audio-generation" | "video-compilation" | "video-generation" | "video-generation-ai" | "video-extension-ai" | "timeline-generation" | "thumbnail-generation" | "music-generation" | "sound-generation" | "description-generation";
export type ProcessStatus = "pending" | "queued" | "processing" | "stopping" | "completed" | "failed" | "cancelled";
/**
 * Process group definition for aggregating related processes
 */
export interface ProcessGroup {
    groupId: string;
    parentGroupId?: string;
    weight?: number;
    estimatedDuration?: number;
}
/**
 * Step definition for a process
 */
export interface ProcessStep {
    name: string;
    weight?: number;
}
/**
 * Unified process update with step tracking
 */
export interface ProcessUpdate {
    processId: string;
    type?: ProcessType;
    resourceId?: string;
    status: ProcessStatus;
    progress: number;
    currentStep?: number;
    totalSteps?: number;
    stepName?: string;
    stage?: string;
    message: string;
    result?: any;
    error?: string;
    provider?: string;
    model?: string;
    videoId?: string;
    videoSubject?: string;
    currentChapter?: number;
    totalChapters?: number;
    metadata?: Record<string, any>;
    groupId?: string;
    parentGroupId?: string;
    parentProcessId?: string;
    isMaster?: boolean;
    groupProgress?: number;
    groupCompleted?: number;
    groupTotal?: number;
    groupMessage?: string;
    estimatedDuration?: number;
    elapsedTime?: number;
    remainingTime?: number;
}
/**
 * Process request
 */
export interface ProcessRequest {
    type: ProcessType;
    userId: string;
    resourceId: string;
    metadata: Record<string, any>;
    groupId?: string;
    parentGroupId?: string;
    parentProcessId?: string;
    isMaster?: boolean;
    weight?: number;
    estimatedDuration?: number;
}
/**
 * Process handler interface
 */
export interface ProcessHandler {
    handle(processId: string, request: ProcessRequest): Promise<any>;
    cancel?(processId: string): Promise<void>;
}
//# sourceMappingURL=process.d.ts.map