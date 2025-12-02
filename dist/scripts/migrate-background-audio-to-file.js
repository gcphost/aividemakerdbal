"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.migrateBackgroundAudioToFile = migrateBackgroundAudioToFile;
const data_source_1 = require("../data-source");
// Migration script: BackgroundAudio entity was migrated to File entity (already completed)
const File_1 = require("../entities/File");
const Video_1 = require("../entities/Video");
async function migrateBackgroundAudioToFile() {
    console.log('🚀 Starting BackgroundAudio to File migration...');
    if (!data_source_1.AppDataSource.isInitialized) {
        await data_source_1.AppDataSource.initialize();
    }
    const backgroundAudioRepository = data_source_1.AppDataSource.getRepository(BackgroundAudio);
    const fileRepository = data_source_1.AppDataSource.getRepository(File_1.File);
    const videoRepository = data_source_1.AppDataSource.getRepository(Video_1.Video);
    // Get all BackgroundAudio records
    const backgroundAudios = await backgroundAudioRepository.find();
    console.log(`📊 Found ${backgroundAudios.length} BackgroundAudio records to migrate`);
    const idMapping = new Map();
    // Process each BackgroundAudio record
    for (const bgAudio of backgroundAudios) {
        console.log(`🔄 Migrating BackgroundAudio: ${bgAudio.name} (${bgAudio._id})`);
        // Create metadata object
        const metadata = {
            title: bgAudio.title,
            description: bgAudio.description,
            genre: bgAudio.genre,
            mood: bgAudio.mood,
            tempo: bgAudio.tempo,
            instrumental: bgAudio.instrumental || false,
            volume: bgAudio.volume || 70,
            loop: bgAudio.loop || false,
            searchTerm: bgAudio.searchTerm,
            prompt: bgAudio.prompt,
            audioFileId: bgAudio.audioFileId,
            duration: bgAudio.duration,
            audioGeneratedAt: bgAudio.audioGeneratedAt,
            audioGenerationTimeMs: bgAudio.audioGenerationTimeMs,
            originalBackgroundAudioId: bgAudio._id,
            type: bgAudio.type, // Type field may not be in entity definition yet
        };
        // Parse waveformPeaks if it's a string
        if (bgAudio.waveformPeaks) {
            if (typeof bgAudio.waveformPeaks === 'string') {
                try {
                    metadata.waveformPeaks = JSON.parse(bgAudio.waveformPeaks);
                }
                catch (e) {
                    console.warn(`⚠️ Failed to parse waveformPeaks for ${bgAudio._id}:`, e);
                }
            }
            else if (Array.isArray(bgAudio.waveformPeaks)) {
                metadata.waveformPeaks = bgAudio.waveformPeaks;
            }
        }
        // Determine category based on type
        let category = 'background-audio';
        if (bgAudio.type === 'music') {
            category = 'music';
        }
        else if (bgAudio.type === 'sound-effect' || !bgAudio.type) {
            category = 'sound-effect';
        }
        // Create File record
        const fileRecord = fileRepository.create({
            _id: bgAudio._id, // Keep the same ID for easier migration
            userId: bgAudio.userId,
            filename: `${bgAudio.name}.mp3`, // Assume mp3 extension, could be improved
            title: bgAudio.name,
            mimeType: 'audio/mpeg', // Default, could be improved
            size: 0, // Unknown, could be improved by checking actual file
            url: bgAudio.audioUrl,
            publicUrl: bgAudio.audioUrl,
            status: bgAudio.status,
            type: 'background-audio',
            category: category,
            metadata: JSON.stringify(metadata),
        });
        await fileRepository.save(fileRecord);
        idMapping.set(bgAudio._id, fileRecord._id);
        console.log(`✅ Migrated ${bgAudio.name} → File ${fileRecord._id}`);
    }
    console.log(`🔄 Updating Video timeline references...`);
    // Update all Video timeline references
    const videos = await videoRepository.find();
    console.log(`📊 Found ${videos.length} videos to check for timeline updates`);
    for (const video of videos) {
        let updated = false;
        // Update timeline data (assuming it's stored as JSON)
        if (video.timeline) {
            let timelineData;
            if (typeof video.timeline === 'string') {
                timelineData = JSON.parse(video.timeline);
            }
            else {
                timelineData = video.timeline;
            }
            // Update backgroundAudio references in timeline
            if (timelineData.layers) {
                for (const layer of timelineData.layers) {
                    if (layer.type === 'backgroundAudio' && layer.items) {
                        for (const item of layer.items) {
                            if (item.backgroundAudioId && idMapping.has(item.backgroundAudioId)) {
                                const newFileId = idMapping.get(item.backgroundAudioId);
                                console.log(`🔄 Updating timeline reference: ${item.backgroundAudioId} → ${newFileId}`);
                                item.fileId = newFileId;
                                delete item.backgroundAudioId; // Remove old field
                                updated = true;
                            }
                        }
                    }
                }
            }
            // Update sources section
            if (timelineData.sources?.backgroundAudio) {
                for (const bgAudio of timelineData.sources.backgroundAudio) {
                    if (bgAudio.id && idMapping.has(bgAudio.id)) {
                        const newFileId = idMapping.get(bgAudio.id);
                        console.log(`🔄 Updating source reference: ${bgAudio.id} → ${newFileId}`);
                        bgAudio.fileId = newFileId;
                        delete bgAudio.backgroundAudioId; // Remove old field
                        updated = true;
                    }
                }
            }
            // Save updated timeline
            if (updated) {
                video.timeline = typeof video.timeline === 'string' ? JSON.stringify(timelineData) : timelineData;
                await videoRepository.save(video);
                console.log(`✅ Updated timeline for video: ${video.subject || video._id}`);
            }
        }
    }
    console.log('🎉 Migration completed successfully!');
    console.log(`📊 Migrated ${backgroundAudios.length} BackgroundAudio records`);
    console.log('📝 Next steps:');
    console.log('   1. Test that all audio files are accessible through File API');
    console.log('   2. Update application code to use File entity');
    console.log('   3. Remove BackgroundAudio entity after thorough testing');
}
// Run the migration if this script is executed directly
if (require.main === module) {
    migrateBackgroundAudioToFile()
        .then(() => {
        console.log('✅ Migration completed');
        process.exit(0);
    })
        .catch((error) => {
        console.error('❌ Migration failed:', error);
        process.exit(1);
    });
}
//# sourceMappingURL=migrate-background-audio-to-file.js.map