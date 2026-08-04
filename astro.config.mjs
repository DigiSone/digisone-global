// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig, fontProviders } from 'astro/config';
import sanity from '@sanity/astro'; // 1. Sanity इम्पोर्ट किया गया है

// https://astro.build/config
export default defineConfig({
    site: 'https://digisone.com',
    // Prefer one style and stick to it site-wide:
    trailingSlash: 'always', // or 'ignore' / 'never' — pick one
    
    // 2. Integrations ऐरे में Sanity को जोड़ा गया है
    integrations: [
        mdx(), 
        sitemap(),
        sanity({
            projectId: '2g96mszr',     // आपका Sanity Project ID
            dataset: 'production',     // डिफ़ॉल्ट डेटासेट
            apiVersion: '2026-08-04',  // करंट API वर्ज़न डेट 
            useCdn: false,             // डेवलपमेंट में false रखें (ताकि लाइव अपडेट्स दिखें)
        })
    ],
    
    fonts: [
        {
            provider: fontProviders.local(),
            name: 'Atkinson',
            cssVariable: '--font-atkinson',
            fallbacks: ['sans-serif'],
            options: {
                variants: [
                    {
                        src: ['./src/assets/fonts/atkinson-regular.woff'],
                        weight: 400,
                        style: 'normal',
                        display: 'swap',
                    },
                    {
                        src: ['./src/assets/fonts/atkinson-bold.woff'],
                        weight: 700,
                        style: 'normal',
                        display: 'swap',
                    },
                ],
            },
        },
    ],
});