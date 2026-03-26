import { Head, usePage, router } from '@inertiajs/react';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, Sparkles, Link2, Menu, X, ChevronRight, ChevronLeft, Phone, Mail, Instagram, Twitter } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import type { PraktikanCategory, PraktikanLink, PageProps, HeroImage } from '@/types';

interface WelcomeProps extends PageProps {
    displayMode: 'folder' | 'direct';
    categories: (PraktikanCategory & { active_links: PraktikanLink[] })[];
    links: (PraktikanLink & { category: PraktikanCategory })[];
    globalSettings: Record<string, string>;
    spvContacts: { name: string, phone: string, contact_location: string }[];
    slideshowImages: HeroImage[];
    slideshowActive: boolean;
    slideshowDelay?: number;
}

const categoryIcons = ['📋', '📚', '🔗', '📊', '📁', '📝', '📎', '📌'];

export default function Welcome() {
    const { displayMode, categories, links, globalSettings = {}, spvContacts = [], slideshowImages = [], slideshowActive = true, slideshowDelay = 5 } = usePage<WelcomeProps>().props;
    const [mobileMenu, setMobileMenu] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [headerShapeClass, setHeaderShapeClass] = useState('rounded-full');
    const [isScrolled, setIsScrolled] = useState(false);
    const [isDesktop, setIsDesktop] = useState(false);
    const shapeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const hasSlideshow = slideshowActive && slideshowImages && slideshowImages.length > 0;

    const totalLinks = displayMode === 'folder'
        ? categories.reduce((acc, cat) => acc + (cat.active_links?.length || 0), 0)
        : links.length;

    useEffect(() => {
        if (!hasSlideshow) return;
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slideshowImages.length);
        }, slideshowDelay * 1000);
        return () => clearInterval(interval);
    }, [hasSlideshow, slideshowImages, slideshowDelay]);

    useEffect(() => {
        const anchors = document.querySelectorAll('a[href^="#"]');
        const handleClick = (e: Event) => {
            e.preventDefault();
            const target = e.currentTarget as HTMLAnchorElement;
            const targetId = target.getAttribute('href')?.substring(1);
            const el = targetId ? document.getElementById(targetId) : null;
            if (el) {
                el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                setMobileMenu(false);
            }
        };
        anchors.forEach(a => a.addEventListener('click', handleClick));
        return () => anchors.forEach(a => a.removeEventListener('click', handleClick));
    }, []);

    // Header shape animation for mobile menu
    useEffect(() => {
        if (shapeTimeoutRef.current) clearTimeout(shapeTimeoutRef.current);
        if (mobileMenu) {
            setHeaderShapeClass('rounded-xl');
        } else {
            shapeTimeoutRef.current = setTimeout(() => setHeaderShapeClass('rounded-full'), 300);
        }
        return () => { if (shapeTimeoutRef.current) clearTimeout(shapeTimeoutRef.current); };
    }, [mobileMenu]);

    // Scroll detection for floating navbar
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

    const navLinks = [
        { label: 'Link Praktikan', href: '#link-praktikan' },
        { label: 'Tentang', href: '#tentang' },
        { label: 'Kontak', href: '#kontak' },
    ];

    return (
        <>
            <Head>
                <title>Link Praktikan - Laboratorium Manajemen Lanjut</title>
                <meta name="description" content="Kumpulan link penting untuk praktikan Laboratorium Manajemen Lanjut Universitas Gunadarma" />
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
                {/* Header - Scroll-animated floating navbar */}
                <header
                    className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-50
                        flex flex-col items-center
                        ${isDesktop && !isScrolled ? '' : 'shadow-lg shadow-black/10'}
                        px-6 py-3 backdrop-blur-sm
                        ${headerShapeClass}
                        ${isDesktop && !isScrolled ? 'bg-transparent' : 'bg-white/70'}
                        ${isDesktop && isScrolled ? 'w-[725px]' : 'w-[calc(100%-2rem)]'}
                        ${isDesktop ? 'transition-all duration-300 ease-in-out' : ''}`}
                >
                    <div className={`flex items-center ${isDesktop && !isScrolled ? 'justify-between w-full' : 'justify-center gap-x-8'}`}>
                        <div className="flex items-center gap-6 sm:gap-8">
                            {/* Logo */}
                            <div className="flex items-center">
                                <img src="/bangkinglab_ug.png" alt="Lab ManLan" className="h-8 md:h-10 w-auto" />
                                <span className="ml-2 md:ml-3 font-medium text-base md:text-lg text-gray-800 max-w-[160px] sm:max-w-none leading-tight">
                                    Laboratorium Manajemen Lanjut
                                </span>
                            </div>

                            {/* Desktop Nav */}
                            <nav className="hidden md:flex items-center space-x-2 sm:space-x-3 text-sm">
                                {navLinks.map(link => (
                                    <a
                                        key={link.label}
                                        href={link.href}
                                        className="text-sm font-medium px-3 py-2 rounded-full text-gray-700 hover:text-purple-600 hover:bg-purple-50/50 transition-all duration-200 whitespace-nowrap"
                                    >
                                        {link.label}
                                    </a>
                                ))}
                            </nav>
                        </div>

                        {/* Right side placeholder for expanded state to keep logo on left */}
                        {isDesktop && !isScrolled && (
                            <div className="hidden md:block w-10" />
                        )}

                        {/* Mobile Toggle */}
                        <button
                            onClick={() => setMobileMenu(!mobileMenu)}
                            className="md:hidden flex items-center justify-center w-8 h-8 text-gray-600 hover:text-gray-800 focus:outline-none"
                        >
                            {mobileMenu ? (
                                <X className="w-6 h-6" />
                            ) : (
                                <Menu className="w-6 h-6" />
                            )}
                        </button>
                    </div>

                    {/* Mobile Menu */}
                    <div className={`md:hidden flex flex-col items-center w-full transition-all ease-in-out duration-300 overflow-hidden
                        ${mobileMenu ? 'max-h-[1000px] opacity-100 pt-6 pb-2' : 'max-h-0 opacity-0 pt-0 pointer-events-none'}`}
                    >
                        <nav className="flex flex-col items-center space-y-1 text-base w-full">
                            {navLinks.map(link => (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    className="text-gray-800 font-medium transition-colors w-full text-center py-3 text-base hover:text-purple-600"
                                >
                                    {link.label}
                                </a>
                            ))}
                        </nav>
                    </div>
                </header>

                {/* Hero */}
                <section className="pt-28 md:pt-32 pb-16 md:pb-24 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 lg:gap-20 items-center justify-center">
                        <main className="w-full max-w-xl">
                            <div className="text-left">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6 }}
                                    className="inline-flex items-center px-3 py-1.5 rounded-full bg-purple-50 border border-purple-100 mb-5"
                                >
                                    <Sparkles className="mr-2 h-4 w-4 text-purple-500" />
                                    <span className="text-purple-700 text-sm font-medium">Portal Link Praktikan</span>
                                </motion.div>

                                <motion.h1
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.1 }}
                                    className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight tracking-tight font-light text-gray-900 mb-4"
                                >
                                    Akses <span className="font-medium italic">Link Penting</span> untuk Praktikan
                                </motion.h1>

                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.2 }}
                                    className="text-sm md:text-base text-gray-500 mb-6 leading-relaxed max-w-lg"
                                >
                                    Kumpulan link penting untuk kebutuhan praktikum dan kegiatan laboratorium.
                                    Apabila terdapat pertanyaan, silakan menghubungi SPV yang sedang bertugas.
                                </motion.p>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.3 }}
                                    className="flex items-center gap-4 text-sm text-gray-400"
                                >
                                    {displayMode === 'folder' && (
                                        <>
                                            <span className="flex items-center gap-2">
                                                <Sparkles className="w-4 h-4 text-purple-400" />
                                                {categories.length} Kategori
                                            </span>
                                            <span className="w-1 h-1 rounded-full bg-gray-300" />
                                        </>
                                    )}
                                    <span className="flex items-center gap-2">
                                        <Link2 className="w-4 h-4 text-purple-400" />
                                        {totalLinks} Link
                                    </span>
                                </motion.div>
                            </div>
                        </main>

                        {/* Decorative Side / Slideshow */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="w-full lg:w-[55%] max-w-3xl hidden lg:block"
                        >
                            <div className="relative aspect-video w-full mx-auto group">
                                <div className="absolute inset-0 bg-gray-50 rounded-2xl shadow-2xl overflow-hidden flex items-center justify-center border border-gray-100">
                                    {hasSlideshow ? (
                                        <>
                                            <AnimatePresence mode="wait">
                                                <motion.img
                                                    key={currentSlide}
                                                    src={(() => {
                                                        const path = slideshowImages[currentSlide].image_path;
                                                        if (path.startsWith('http')) return path;
                                                        // Hapus leading slash jika ada
                                                        const cleanPath = path.startsWith('/') ? path.substring(1) : path;
                                                        // Jika path sudah mengandung 'storage/', kita harus hati-hati
                                                        // karena symlink storage_link_penting biasanya langsung ke isi 'public'
                                                        const finalPath = cleanPath.startsWith('storage/') ? cleanPath.replace('storage/', '') : cleanPath;
                                                        return `/storage_link_penting/${finalPath}`;
                                                    })()}
                                                    alt={`Slide ${currentSlide}`}
                                                    className="w-full h-full object-cover"
                                                    initial={{ opacity: 0, scale: 1.05 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    exit={{ opacity: 0 }}
                                                    transition={{ duration: 0.8 }}
                                                />
                                            </AnimatePresence>

                                            {/* Navigation Arrows */}
                                            {slideshowImages.length > 1 && (
                                                <>
                                                    <button
                                                        onClick={() => setCurrentSlide((prev) => prev === 0 ? slideshowImages.length - 1 : prev - 1)}
                                                        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/30 hover:bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm"
                                                    >
                                                        <ChevronLeft className="w-6 h-6" />
                                                    </button>
                                                    <button
                                                        onClick={() => setCurrentSlide((prev) => (prev + 1) % slideshowImages.length)}
                                                        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/30 hover:bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm"
                                                    >
                                                        <ChevronRight className="w-6 h-6" />
                                                    </button>
                                                </>
                                            )}
                                        </>
                                    ) : (
                                        <div className="text-center p-8 bg-gradient-to-br from-purple-50 to-white w-full h-full flex flex-col items-center justify-center">
                                            <img src="/bangkinglab_ug.png" alt="Lab ManLan" className="w-24 h-24 mx-auto mb-4 opacity-80" />
                                            <h3 className="text-lg font-semibold text-gray-700 mb-1">Link Praktikan</h3>
                                            <p className="text-sm text-gray-400">Manajemen Lanjut</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Slide Indicators */}
                            {hasSlideshow && slideshowImages.length > 1 && (
                                <div className="flex justify-center mt-6 gap-2">
                                    {slideshowImages.map((_, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setCurrentSlide(idx)}
                                            className={`h-2 rounded-full transition-all duration-300 ${currentSlide === idx ? 'w-8 bg-purple-600' : 'w-2 bg-purple-200 hover:bg-purple-300'
                                                }`}
                                            aria-label={`Go to slide ${idx + 1}`}
                                        />
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    </div>
                </section>

                {/* Content Section */}
                <section id="link-praktikan" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-5xl mx-auto">
                        <div className="text-center space-y-4 mb-12">
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight tracking-tight font-light text-gray-900"
                            >
                                {displayMode === 'folder' ? 'Kategori Link' : 'Semua Link'}
                            </motion.h2>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                className="text-sm md:text-base text-gray-500 leading-relaxed max-w-lg mx-auto"
                            >
                                {displayMode === 'folder'
                                    ? 'Pilih kategori untuk mengakses link yang tersedia'
                                    : 'Daftar semua link yang tersedia untuk praktikan'}
                            </motion.p>
                        </div>

                        {displayMode === 'folder' ? (
                            /* Folder Mode: Show Categories */
                            categories.length > 0 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {categories.map((category, i) => (
                                        <motion.div
                                            key={category.id}
                                            initial={{ opacity: 0, y: 30 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true, margin: '-50px' }}
                                            className="h-full"
                                            transition={{ duration: 0.5, delay: i * 0.08 }}
                                        >
                                            <button
                                                onClick={() => router.visit(`/category/${category.id}`)}
                                                className="w-full h-full text-left group relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-50/80 to-white border border-gray-200/60 p-6 hover:shadow-lg hover:shadow-purple-500/5 hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col"
                                            >
                                                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-purple-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                                <div className="flex items-start gap-4">
                                                    <div className="w-12 h-12 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-2xl flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                                                        {categoryIcons[i % categoryIcons.length]}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <h3 className="text-base font-semibold text-gray-800 group-hover:text-purple-700 transition-colors mb-1">
                                                            {category.name}
                                                        </h3>
                                                        {category.description && (
                                                            <p className="text-xs text-gray-400 line-clamp-2 mb-2">{category.description}</p>
                                                        )}
                                                        <span className="text-xs text-purple-500 font-medium flex items-center gap-1">
                                                            {category.active_links?.length || 0} link tersedia
                                                            <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                                                        </span>
                                                    </div>
                                                </div>
                                            </button>
                                        </motion.div>
                                    ))}
                                </div>
                            ) : (
                                <EmptyState />
                            )
                        ) : (
                            /* Direct Mode: Show All Links */
                            links.length > 0 ? (
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
                                <EmptyState />
                            )
                        )}
                    </div>
                </section>

                {/* Tentang Kami Section */}
                <section id="tentang" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gray-50/50">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center space-y-4 mb-12">
                            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight tracking-tight font-light text-gray-900">
                                Tentang Kami
                            </h2>
                            <p className="text-sm md:text-base text-gray-500 leading-relaxed max-w-lg mx-auto">
                                Mengenal lebih dalam tentang Laboratorium Manajemen Lanjut Universitas Gunadarma
                            </p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
                            {/* Lab Info Card */}
                            <div className="rounded-xl bg-white border border-gray-200/60 p-6 sm:p-8 hover:shadow-lg transition-shadow duration-300">
                                <div className="w-12 h-12 rounded-lg overflow-hidden bg-purple-50 mb-4 flex items-center justify-center">
                                    <img src="/bangkinglab_ug.png" alt="Lab" className="w-10 h-10 object-cover rounded-md" />
                                </div>
                                <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">Laboratorium Manajemen Lanjut</h3>
                                <p className="text-gray-500 text-sm leading-relaxed mb-6">
                                    Laboratorium Manajemen Lanjut, sering disebut Lab ManLan, merupakan salah satu Laboratorium yang berada di bawah naungan Fakultas Ekonomi Jurusan Manajemen Universitas Gunadarma.
                                </p>
                                <div className="space-y-3">
                                    <h4 className="text-base font-semibold text-gray-800 border-b border-gray-200 pb-2">Lokasi & Fasilitas</h4>
                                    <div className="space-y-2 text-sm text-gray-500">
                                        <p><strong className="text-gray-700">Kampus E (Kelapa Dua):</strong> Berlokasi di E523 dengan ruang staff di E52</p>
                                        <p><strong className="text-gray-700">Praktikum Multi-Kampus:</strong> Juga tersedia di Kampus J Kali Malang (J1416), Kampus K Karawaci, dan Kampus L Cengkareng</p>
                                        <p><strong className="text-gray-700">Kolaborasi:</strong> Bekerja sama dengan Lab. Manajemen Dasar dan Lab. Manajemen Menengah</p>
                                    </div>
                                </div>
                            </div>

                            {/* Visi Misi Card */}
                            <div className="rounded-xl bg-white border border-gray-200/60 p-6 sm:p-8 hover:shadow-lg transition-shadow duration-300">
                                <div className="w-12 h-12 rounded-lg overflow-hidden bg-purple-50 mb-4 flex items-center justify-center">
                                    <img src="/bangkinglab_ug.png" alt="Lab" className="w-10 h-10 object-cover rounded-md" />
                                </div>
                                <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">Visi & Misi</h3>
                                <div className="space-y-6">
                                    <div className="p-4 rounded-lg bg-purple-50/30 border border-purple-100">
                                        <h4 className="text-base font-semibold text-gray-800 border-b border-gray-200 pb-2 mb-3">Visi</h4>
                                        <p className="text-sm text-gray-500 leading-relaxed">
                                            Pada tahun 2017 menjadi laboratorium penyelenggara praktikum yang bereputasi Internasional, memiliki jejaring global, dan memberikan kontribusi signifikan bagi peningkatan daya saing bangsa khususnya bidang Manajemen Pemasaran, Keuangan dan Perbankan berbasis TI.
                                        </p>
                                    </div>
                                    <div>
                                        <h4 className="text-base font-semibold text-gray-800 border-b border-gray-200 pb-2 mb-3">Misi</h4>
                                        <div className="space-y-3">
                                            <div className="flex items-start gap-3">
                                                <span className="text-purple-500 text-lg mt-0.5">•</span>
                                                <p className="text-sm text-gray-500 leading-relaxed">
                                                    Melaksanakan praktikum untuk menghasilkan sarjana Manajemen dan Akuntansi yang profesional dan mampu mengikuti perkembangan ilmu pengetahuan dan teknologi serta mampu bersaing di lingkungan global.
                                                </p>
                                            </div>
                                            <div className="flex items-start gap-3">
                                                <span className="text-purple-500 text-lg mt-0.5">•</span>
                                                <p className="text-sm text-gray-500 leading-relaxed">
                                                    Melaksanakan kegiatan pengembangan dalam bidang Manajemen sehingga dapat memberikan kontribusi kepada kemajuan ilmu pengetahuan.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer / Kontak */}
                <footer id="kontak" className="bg-white border-t border-gray-100 py-12 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-5xl mx-auto">
                        <div className="flex flex-col items-center">
                            <div className="mb-8 rounded-full bg-purple-50 p-6">
                                <img src="/bangkinglab_ug.png" alt="Lab ManLan" className="w-14 h-14" />
                            </div>

                            <div className="mb-8 flex space-x-3">
                                {globalSettings.social_twitter ? (
                                    <a href={globalSettings.social_twitter} target="_blank" rel="nofollow noopener" className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:text-purple-600 hover:border-purple-300 transition-all">
                                        <Twitter className="h-4 w-4" />
                                    </a>
                                ) : (
                                    <a href="https://twitter.com/BankingLab_UG" target="_blank" rel="nofollow noopener" className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:text-purple-600 hover:border-purple-300 transition-all">
                                        <Twitter className="h-4 w-4" />
                                    </a>
                                )}

                                {globalSettings.social_instagram ? (
                                    <a href={globalSettings.social_instagram} target="_blank" rel="nofollow noopener" className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:text-purple-600 hover:border-purple-300 transition-all">
                                        <Instagram className="h-4 w-4" />
                                    </a>
                                ) : (
                                    <a href="https://instagram.com/bankinglab_ug" target="_blank" rel="nofollow noopener" className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:text-purple-600 hover:border-purple-300 transition-all">
                                        <Instagram className="h-4 w-4" />
                                    </a>
                                )}

                                {globalSettings.social_email ? (
                                    <a href={`mailto:${globalSettings.social_email}`} className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:text-purple-600 hover:border-purple-300 transition-all">
                                        <Mail className="h-4 w-4" />
                                    </a>
                                ) : (
                                    <a href="mailto:manlanjutgunadarma@gmail.com" className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:text-purple-600 hover:border-purple-300 transition-all">
                                        <Mail className="h-4 w-4" />
                                    </a>
                                )}
                            </div>

                            <div className="mb-8 flex flex-wrap justify-center gap-6 sm:gap-10 text-center w-full max-w-4xl">
                                {Object.entries(
                                    spvContacts.reduce((acc, contact) => {
                                        if (!acc[contact.contact_location]) acc[contact.contact_location] = [];
                                        acc[contact.contact_location].push(contact);
                                        return acc;
                                    }, {} as Record<string, typeof spvContacts>)
                                ).map(([location, contacts], idx) => (
                                    <div key={idx} className="space-y-2 min-w-[140px]">
                                        <h4 className="font-semibold text-sm text-gray-800 break-words">{location}</h4>
                                        <div className="space-y-1 text-xs text-gray-400">
                                            {contacts.map((contact, i) => (
                                                <div key={i} className="flex flex-col sm:flex-row items-center justify-center gap-1 text-center">
                                                    <span className="flex items-center gap-1">
                                                        <Phone className="h-3 w-3 flex-shrink-0" />
                                                    </span>
                                                    <span className="break-words max-w-[150px] sm:max-w-none">{contact.name} ({contact.phone})</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}

                                {spvContacts.length === 0 && (
                                    <div className="col-span-2 lg:col-span-4 text-center text-gray-400 text-sm">
                                        Info kontak belum tersedia.
                                    </div>
                                )}
                            </div>

                            <p className="text-xs text-gray-400">
                                © {new Date().getFullYear()} Laboratorium Manajemen Lanjut. All rights reserved.
                            </p>
                        </div>
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
                {isPlaceholder ? (
                    <p className="text-[10px] md:text-xs text-amber-500 mt-1 font-medium italic">
                        Link belum tersedia
                    </p>
                ) : (
                    link.category && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] bg-purple-50 text-purple-600 border border-purple-100 mt-1">
                            {link.category.name}
                        </span>
                    )
                )}
            </div>
            {!isPlaceholder && (
                <ExternalLink className="w-4 h-4 text-gray-300 group-hover:text-purple-400 transition-all flex-shrink-0" />
            )}
        </motion.a>
    );
}

function EmptyState() {
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
            <Link2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-400 mb-2">Belum Ada Link</h3>
            <p className="text-gray-400 text-sm">Link akan segera ditambahkan oleh admin.</p>
        </motion.div>
    );
}
