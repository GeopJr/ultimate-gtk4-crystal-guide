export default {
    title: 'Ultimate GTK4 Crystal Guide',
    description: 'Learn how to create premium GTK4 apps in Crystal',
    lastUpdated: true,
    themeConfig: {
        search: {
            provider: 'local'
        },
        editLink: {
            pattern: 'https://github.com/GeopJr/ultimate-gtk4-crystal-guide/edit/main/docs/:path',
            text: 'Edit this page on GitHub'
        },
        footer: {
            message: 'Released under a Creative Commons Zero v1.0 Universal License'
        },
        socialLinks: [
            { icon: 'github', link: 'https://github.com/GeopJr/ultimate-gtk4-crystal-guide' },
            { icon: 'mastodon', link: 'https://tech.lgbt/@GeopJr' }
        ],
        nav: [
            {
                text: 'Language',
                items: [
                    { text: 'English', link: '/en/' },
                    { text: 'Français', link: '/fr/' }
                ]
            }
        ],
        sidebar: {
            '/en/': sidebarEn(),
            '/fr/': sidebarFr()
        }
    }
}


function sidebarEn() {
    return [
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
            text: 'Beginner\'s Guide',
            collapsible: true,
            items: [
                { text: 'Introduction', link: '/en/tutorial/introduction' },
                { text: 'Getting Started', link: '/en/tutorial/getting_started' },
                { text: 'Adding A Content View', link: '/en/tutorial/content_view' },
                { text: 'Loading Content From A File', link: '/en/tutorial/opening_files' },
                { text: 'Showing The Cursor Position', link: '/en/tutorial/cursor_position' },
                { text: 'Saving The Content To A File', link: '/en/tutorial/saving_files' },
                { text: 'Saving The Application State', link: '/en/tutorial/saving_state' },
                { text: 'Notifying The User With Toasts', link: '/en/tutorial/adding_toasts' },
                { text: 'Forcing The Dark Color Scheme', link: '/en/tutorial/dark_mode' },
            ]
        },
        {
            text: 'Extra',
            collapsible: true,
            items: [
                { text: 'Parallelism & Concurrency', link: '/en/extra/parallelism-and-concurrency' },
                { text: 'Gettext (i18n)', link: '/en/extra/gettext' },
                { text: 'Makefile', link: '/en/extra/makefile' },
                { text: 'CLI', link: '/en/extra/cli' },
                { text: 'Blueprint', link: '/en/extra/blueprint' },
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

function sidebarFr() {
    return [
        {
            text: 'Introduction',
            items: [
                { text: 'Bienvenue', link: '/fr/' }
            ]
        },
        {
            text: 'Installation',
            collapsible: true,
            items: [
                { text: 'Linux et BSD', link: '/fr/installation/linux-and-bsd' },
                { text: 'Shard', link: '/fr/installation/shard' },
            ]
        },
        {
            text: 'Structure',
            collapsible: true,
            items: [
                { text: 'Modèle', link: '/fr/structure/template' },
                { text: 'Organisation', link: '/fr/structure/organization' },
            ]
        },
        {
            text: 'Concepts',
            collapsible: true,
            items: [
                { text: 'Les widgets', link: '/fr/concepts/widgets' },
                { text: 'Les signaux', link: '/fr/concepts/signals' },
                { text: 'Les actions', link: '/fr/concepts/actions' },
                { text: 'GResource', link: '/fr/concepts/gresource' },
                { text: 'Débogage', link: '/fr/concepts/debugging' },
            ]
        },
        {
            text: 'Première application',
            collapsible: true,
            items: [
                { text: 'Plan', link: '/fr/first-app/plan' },
                { text: 'Design de l\'IU', link: '/fr/first-app/ui-design' },
                { text: 'Code', link: '/fr/first-app/code' },
                { text: 'Métadonnées', link: '/fr/first-app/metadata' },
                { text: 'Traductions', link: '/fr/first-app/translations' },
                { text: 'GResource', link: '/fr/first-app/gresource' },
                { text: 'Empaquetage', link: '/fr/first-app/packaging' },
            ]
        },
        {
            text: 'Guide pour débutants',
            collapsible: true,
            items: [
                { text: 'Introduction', link: '/fr/tutorial/introduction' },
                { text: 'Bien démarrer', link: '/fr/tutorial/getting_started' },
                { text: 'Ajouter une vue de contenu', link: '/fr/tutorial/content_view' },
                { text: 'Charger un contenu à partir d\'un fichier', link: '/fr/tutorial/opening_files' },
                { text: 'Afficher la position du curseur', link: '/fr/tutorial/cursor_position' },
                { text: 'Sauvegarder le contenu dans un fichier', link: '/fr/tutorial/saving_files' },
                { text: 'Sauvegarder l\'état de l\'application', link: '/fr/tutorial/saving_state' },
                { text: 'Notifier l\'utilisateur avec les toasts', link: '/fr/tutorial/adding_toasts' },
                { text: 'Forcer le thème le mode sombre', link: '/fr/tutorial/dark_mode' },
            ]
        },
        {
            text: 'Extra',
            collapsible: true,
            items: [
                { text: 'Parralélisme et concurrence', link: '/fr/extra/parallelism-and-concurrency' },
                { text: 'Gettext (i18n)', link: '/fr/extra/gettext' },
                { text: 'Makefile', link: '/fr/extra/makefile' },
                { text: 'CLI', link: '/fr/extra/cli' },
                { text: 'Blueprint', link: '/fr/extra/blueprint' },
                { text: 'Crédits', link: '/fr/extra/credits' },
                { text: 'Libadwaita', link: '/fr/extra/libadwaita' },
                { text: 'Liaisons C', link: '/fr/extra/bindings' },
                { text: 'Rucksack', link: '/fr/extra/rucksack' },
            ]
        },
        {
            text: 'Empaquetage',
            collapsible: true,
            items: [
                { text: 'Flatpak', link: '/fr/packaging/flatpak' },
            ]
        },
    ]
}
