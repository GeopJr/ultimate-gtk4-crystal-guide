export default {
    title: 'Ultimate GTK4 Crystal Guide',
    description: 'Learn how to create premium GTK4 apps in Crystal',
    lastUpdated: true,
    themeConfig: {
        editLink: {
            pattern: 'https://github.com/GeopJr/ultimate-gtk4-crystal-guide/edit/main/docs/:path',
            text: 'Edit this page on GitHub'
        },
        footer: {
            message: 'Released under a Creative Commons Zero v1.0 Universal License'
        },
        socialLinks: [
            { icon: 'github', link: 'https://github.com/GeopJr/ultimate-gtk4-crystal-guide' },
            { icon: 'twitter', link: 'https://twitter.com/GeopJr1312/' }
        ],
        nav: [
            {
                text: 'Language',
                items: [
                    { text: 'English', link: '/en/' }
                ]
            }
        ],
        sidebar: {
            '/en/': [
                {
                    text: 'Introduction',
                    items: [
                        { text: 'Welcome', link: '/en/' }
                    ]
                },
                {
                    text: 'Installation',
                    collapsible: true,
                    items: [
                        { text: 'Linux and BSD', link: '/en/installation/linux-and-bsd' },
                        { text: 'Shard', link: '/en/installation/shard' },
                    ]
                },
                {
                    text: 'Structure',
                    collapsible: true,
                    items: [
                        { text: 'Template', link: '/en/structure/template' },
                        { text: 'Organization', link: '/en/structure/organization' },
                    ]
                },
                {
                    text: 'Concepts',
                    collapsible: true,
                    items: [
                        { text: 'Widgets', link: '/en/concepts/widgets' },
                        { text: 'Signals', link: '/en/concepts/signals' },
                        { text: 'Actions', link: '/en/concepts/actions' },
                        { text: 'GResource', link: '/en/concepts/gresource' },
                        { text: 'Debugging', link: '/en/concepts/debugging' },
                    ]
                },
                {
                    text: 'First App',
                    collapsible: true,
                    items: [
                        { text: 'Plan', link: '/en/first-app/plan' },
                        { text: 'UI Design', link: '/en/first-app/ui-design' },
                        { text: 'Code', link: '/en/first-app/code' },
                        { text: 'Metadata', link: '/en/first-app/metadata' },
                        { text: 'Translations', link: '/en/first-app/translations' },
                        { text: 'GResource', link: '/en/first-app/gresource' },
                        { text: 'Packaging', link: '/en/first-app/packaging' },
                    ]
                },
                {
                    text: 'Extra',
                    collapsible: true,
                    items: [
                        { text: 'Parallelism & Concurrency', link: '/en/extra/parallelism-and-concurrency' },
                        { text: 'Gettext (i18n)', link: '/en/extra/gettext' },
                        { text: 'Makefile', link: '/en/extra/makefile' },
                        { text: 'Credits', link: '/en/extra/credits' },
                        { text: 'Libadwaita', link: '/en/extra/libadwaita' },
                        { text: 'Bindings', link: '/en/extra/bindings' },
                        { text: 'Rucksack', link: '/en/extra/rucksack' },
                    ]
                },
                {
                    text: 'Packaging',
                    collapsible: true,
                    items: [
                        { text: 'Flatpak', link: '/en/packaging/flatpak' },
                    ]
                },
            ]
        }
    }
}
