import { Process } from "../entities/Process";
import { ProcessEstimate } from "../entities/ProcessEstimate";
export type IProcess = Process;
export type NewProcess = Partial<Process>;
export type IProcessEstimate = ProcessEstimate;
export type ServiceType = "video-generation" | "image-generation" | "audio-generation" | "description-generation" | "tts" | "video-compilation" | "thumbnail-generation" | "sound-generation" | "music-generation" | "video-extension";
export type UnitType = "character" | "token" | "image" | "second" | "minute" | "unit";
//# sourceMappingURL=process.d.ts.map