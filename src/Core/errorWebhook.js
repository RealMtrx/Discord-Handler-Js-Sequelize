import { WebhookClient } from 'discord.js';
import config from '../config.js';

let webhookClient = null;

if (config.errorWebhook) {
    try {
        webhookClient = new WebhookClient({ url: config.errorWebhook });
    } catch (error) {
    }
}

export async function sendErrorToWebhook(error, context = {}) {
    if (!webhookClient) return;

    try {
        const embed = {
            color: 0xFF0000,
            title: '❌ Bot Error Report',
            description: `**Error Type:** ${error.name || 'Unknown'}\n**Message:** ${error.message}`,
            fields: [
                {
                    name: '📅 Timestamp',
                    value: new Date().toISOString(),
                    inline: true
                },
                {
                    name: '🔧 Context',
                    value: context.eventName || context.commandName || 'Unknown',
                    inline: true
                }
            ],
            footer: {
                text: `${config.botName} • Error Logger`
            },
            timestamp: new Date().toISOString()
        };

        if (error.stack) {
                const stackTrace = error.stack.length > 1000
                    ? error.stack.substring(0, 1000) + '...'
                    : error.stack;

                embed.fields.push({
                    name: '📋 Stack Trace',
                    value: `\`\`\`js\n${stackTrace}\`\`\``,
                    inline: false
                });
            }

        if (context.user) {
            embed.fields.push({
                name: '👤 User',
                value: `${context.user.tag} (${context.user.id})`,
                inline: true
            });
        }

        if (context.guild) {
            embed.fields.push({
                name: '🏠 Guild',
                value: `${context.guild.name} (${context.guild.id})`,
                inline: true
            });
        }

        await webhookClient.send({
            embeds: [embed]
        });
    } catch (webhookError) {
    }
}
