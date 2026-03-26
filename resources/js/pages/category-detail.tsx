import { Head, usePage, router } from '@inertiajs/react';
import { motion } from 'motion/react';
import { ExternalLink, ArrowLeft, Link2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import type { PraktikanCategory, PraktikanLink, PageProps } from '@/types';

interface CategoryDetailProps extends PageProps {
    category: PraktikanCategory;
    links: PraktikanLink[];
}

export default function CategoryDetail() {
    const props = usePage<CategoryDetailProps>().props;
    const category = props.category || {} as PraktikanCategory;
    const [isScrolled, setIsScrolled] = useState(false);
    const [isDesktop, setIsDesktop] = useState(false);
    
    // Ensure links is an array
    const tempLinks = props.links || [];
    const links = (Array.isArray(tempLinks) ? tempLinks : Object.values(tempLinks)) as PraktikanLink[];

    useEffect(() => {
        const checkIsDesktop = () => {
            const nowIsDesktop = window.innerWidth >= 768;
            setIsDesktop(nowIsDesktop);
            if (!nowIsDesktop) setIsScrolled(false);
        };
        const handleScroll = () => {
            if (window.innerWidth < 768) return;
            setIsScrolled(window.pageYOffset > 50);
        };
        checkIsDesktop();
        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('resize', () => { checkIsDesktop(); setTimeout(handleScroll, 100); });
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', checkIsDesktop);
        };
    }, []);

    return (
        <>
            <Head title={`${category.name || ''} - Link Praktikan`}>
                <meta name="description" content={`Link ${category.name || ''} untuk praktikan Laboratorium Manajemen Lanjut`} />
            </Head>

            {/* Page Loading Overlay */}
            <div id="page-loading" className="fixed inset-0 z-[9999] bg-white/60 backdrop-blur-sm flex items-center justify-center opacity-0 pointer-events-none transition-opacity duration-300">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 rounded-full border-4 border-purple-500/30 border-t-purple-500 animate-spin" />
                    <p className="text-gray-600 text-sm font-medium animate-pulse">Memuat...</p>
                </div>
            </div>
            <div id="loading-bar" className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-fuchsia-500 to-purple-500 z-[9998] scale-x-0 origin-left transition-transform duration-500 loading-bar-shimmer" />

            <div className="min-h-screen bg-white text-gray-900">
                {/* Header */}
                <header 
                    className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-50 
                        flex items-center justify-between shadow-lg shadow-black/10 
                        px-6 py-3 backdrop-blur-sm rounded-full 
                        ${isDesktop && !isScrolled ? 'bg-transparent shadow-none' : 'bg-white/70 shadow-lg shadow-black/10'}
                        ${isDesktop && isScrolled ? 'w-[800px]' : 'w-[calc(100%-2rem)]'}
                        ${isDesktop ? 'transition-all duration-300 ease-in-out' : ''}`}
                >
                    <div className="flex items-center">
                        <img src="/bangkinglab_ug.png" alt="Lab ManLan" className="h-8 md:h-10 w-auto" />
                        <span className="ml-2 md:ml-3 font-medium text-base md:text-lg text-gray-800 max-w-[160px] sm:max-w-none leading-tight">
                            Laboratorium Manajemen Lanjut
                        </span>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="hidden lg:block text-sm text-gray-500 whitespace-nowrap font-normal">Halo Praktikan Lab Manajemen Lanjut 👋</span>
                        <div className="hidden lg:block h-6 w-px bg-gray-200 mx-1" />
                        <button
                            onClick={(e) => { e.preventDefault(); router.visit('/'); }}
                            className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#a41fba] text-white text-sm font-medium hover:bg-[#a41fba]/90 transition-all shadow-md shadow-purple-500/20"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            <span>Kembali</span>
                        </button>
                    </div>
                </header>

                {/* Content */}
                <section className="pt-28 md:pt-32 pb-16 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-5xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-left mb-12"
                        >
                            <h1 className="text-3xl sm:text-4xl md:text-5xl leading-tight tracking-tight font-light text-gray-900 mb-4">
                                {category.name}
                            </h1>
                            {category.description && (
                                <p className="text-sm md:text-base text-gray-500 leading-relaxed max-w-lg">
                                    {category.description}
                                </p>
                            )}
                            <div className="flex items-center gap-2 mt-4 text-sm text-gray-400">
                                <Link2 className="w-4 h-4 text-purple-400" />
                                {links.length} link tersedia
                            </div>
                        </motion.div>

                        {links.length > 0 ? (
                            (() => {
                                const subGroups = [...new Set(links.map((l) => l.sub_group).filter(Boolean))];
                                const hasSubGroups = subGroups.length > 0;
                                const linksWithoutGroup = links.filter(l => !l.sub_group);

                                return (
                                    <div className="space-y-10">
                                        {hasSubGroups ? (
                                            <>
                                                {subGroups.map((group) => (
                                                    <div key={group} className="space-y-4">
                                                        <h3 className="text-sm font-bold uppercase tracking-wider text-purple-600 mb-4 px-1">
                                                            {group}
                                                        </h3>
                                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                            {links.filter(l => l.sub_group === group).map((link, i) => (
                                                                <LinkBox key={link.id} link={link} index={i} />
                                                            ))}
                                                        </div>
                                                    </div>
                                                ))}
                                                {linksWithoutGroup.length > 0 && (
                                                    <div className="space-y-4">
                                                        <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-4 px-1">
                                                            Lainnya
                                                        </h3>
                                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                            {linksWithoutGroup.map((link, i) => (
                                                                <LinkBox key={link.id} link={link} index={i} />
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </>
                                        ) : (
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                {links.map((link, i) => (
                                                    <LinkBox key={link.id} link={link} index={i} />
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                );
                            })()
                        ) : (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
                                <Link2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                <h3 className="text-xl font-semibold text-gray-400 mb-2">Belum Ada Link</h3>
                                <p className="text-gray-400 text-sm">Link akan segera ditambahkan oleh admin.</p>
                            </motion.div>
                        )}
                    </div>
                </section>

                {/* Footer */}
                <footer className="bg-white border-t border-gray-100 py-8 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-5xl mx-auto text-center">
                        <p className="text-xs text-gray-400">
                            © {new Date().getFullYear()} Laboratorium Manajemen Lanjut. All rights reserved.
                        </p>
                    </div>
                </footer>
            </div>
        </>
    );
}

function LinkBox({ link, index }: { link: PraktikanLink; index: number }) {
    const isPlaceholder = !link.url || link.url === '#';

    return (
        <motion.a
            key={link.id}
            href={isPlaceholder ? undefined : link.url}
            target={isPlaceholder ? undefined : "_blank"}
            rel={isPlaceholder ? undefined : "noopener noreferrer"}
            onClick={(e) => { if (isPlaceholder) e.preventDefault(); }}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className={`group h-full flex items-center gap-4 p-4 rounded-xl bg-gradient-to-br from-gray-50 to-white border border-gray-200/60 transition-all duration-300 ${
                isPlaceholder 
                ? 'opacity-60 cursor-not-allowed' 
                : 'hover:shadow-lg hover:shadow-purple-500/5 hover:border-purple-200 hover:-translate-y-0.5'
            }`}
        >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
                isPlaceholder ? 'bg-gray-100 border border-gray-200' : 'bg-purple-50 border border-purple-100 group-hover:bg-purple-100'
            }`}>
                <ExternalLink className={`w-4 h-4 ${isPlaceholder ? 'text-gray-400' : 'text-purple-500'}`} />
            </div>
            <div className="flex-1 min-w-0">
                <h3 className={`text-sm font-semibold transition-colors truncate ${
                    isPlaceholder ? 'text-gray-500' : 'text-gray-800 group-hover:text-purple-700'
                }`}>
                    {link.title}
                </h3>
                {link.description && (
                    <p className="text-xs text-gray-400 truncate mt-0.5">{link.description}</p>
                )}
                {isPlaceholder && (
                    <p className="text-[10px] md:text-xs text-amber-500 mt-1 font-medium italic">
                        Link belum tersedia
                    </p>
                )}
            </div>
            {!isPlaceholder && (
                <ExternalLink className="w-4 h-4 text-gray-300 group-hover:text-purple-400 transition-all flex-shrink-0" />
            )}
        </motion.a>
    );
}
