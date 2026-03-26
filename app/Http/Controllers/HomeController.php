<?php

namespace App\Http\Controllers;

use App\Models\PraktikanCategory;
use App\Models\PraktikanLink;
use App\Models\Setting;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        $displayModeSetting = Setting::where('key', 'praktikan_display_mode')->first();
        $mode = $displayModeSetting ? $displayModeSetting->value : 'folder';

        // Auto-fallback: jika kategori > 1, WAJIB menggunakan mode folder
        $categoryCount = PraktikanCategory::count();
        if ($categoryCount > 1) {
            $mode = 'folder';
        }

        $globalSettings = Setting::whereIn('key', ['social_twitter', 'social_instagram', 'social_email'])
            ->pluck('value', 'key')
            ->toArray();
        $spvContacts = \App\Models\User::where('show_phone', true)
            ->whereNotNull('phone')
            ->get(['name', 'phone', 'contact_location'])
            ->map(function ($user) {
                return [
                    'name' => $user->name,
                    'phone' => $user->phone,
                    'contact_location' => $user->contact_location ?: 'Spv ' . $user->name,
                ];
            });

        $slideshowImages = \App\Models\HeroImage::where('is_active', true)
            ->whereIn('visibility', ['praktikan', 'both'])
            ->orderBy('sort_order')
            ->get();
        $slideshowSetting = \App\Models\Setting::where('key', 'hero_slideshow_active')->first();
        $isSlideshowActive = $slideshowSetting ? $slideshowSetting->value === '1' : true;

        $delaySetting = \App\Models\Setting::where('key', 'hero_slideshow_delay')->first();
        $slideshowDelay = $delaySetting ? (int) $delaySetting->value : 5;

        if ($mode === 'direct') {
            // Direct mode: show all active links combined
            $links = PraktikanLink::where('is_active', true)
                ->with('category')
                ->orderBy('sort_order')
                ->get();

            return Inertia::render('welcome', [
                'displayMode' => 'direct',
                'links' => $links,
                'categories' => [],
                'globalSettings' => $globalSettings,
                'spvContacts' => $spvContacts,
                'slideshowImages' => $slideshowImages,
                'slideshowActive' => $isSlideshowActive,
                'slideshowDelay' => $slideshowDelay,
            ]);
        }

        // Folder mode: show categories with their active links
        $categories = PraktikanCategory::with([
            'activeLinks' => function ($q) {
                $q->orderBy('sort_order');
            }
        ])
            ->orderBy('sort_order')
            ->get()
            ->filter(fn($cat) => $cat->activeLinks->count() > 0);

        return Inertia::render('welcome', [
            'displayMode' => 'folder',
            'categories' => $categories->values(),
            'links' => [],
            'globalSettings' => $globalSettings,
            'spvContacts' => $spvContacts,
            'slideshowImages' => $slideshowImages,
            'slideshowActive' => $isSlideshowActive,
            'slideshowDelay' => $slideshowDelay,
        ]);
    }

    public function showCategory(PraktikanCategory $category)
    {
        $category->load([
            'activeLinks' => function ($q) {
                $q->orderBy('sort_order');
            }
        ]);

        return Inertia::render('category-detail', [
            'category' => $category,
            'links' => $category->activeLinks,
        ]);
    }
}
