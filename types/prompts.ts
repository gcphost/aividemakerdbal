/**
 * Prompt System Types
 * Shared between app and socket-server
 */

/**
 * Known default prompt names (user-configurable, stored in Profile)
 */
export type DefaultPromptName =
  | "narrator"
  | "anti-ai"
  | "intro-script"
  | "outro-script"
  | "advertising"
  | "chapter-transition"
  | "chapter-generation"
  | "image-style"
  | "image-description"
  | "sound-generation"
  | "music-generation";

/**
 * Known system prompt names (core AI instructions, not user-configurable)
 */
export type SystemPromptName =
  | "chapter-outline"
  | "script-generation"
  | "timeline-generation"
  | "youtube-description"
  | "profile-generator";

/**
 * All known prompt names
 */
export type PromptName = DefaultPromptName | SystemPromptName;

/**
 * Represents a prompt definition loaded from a YAML file
 */
export interface PromptDefinition {
  /** Unique identifier for the prompt (matches filename without extension) */
  name: string;

  /** Human-readable description of what this prompt does */
  description?: string;

  /** List of variable names that can be used in the prompt template */
  variables?: string[];

  /** The actual prompt template text with optional {{variable}} placeholders */
  prompt: string;
}

