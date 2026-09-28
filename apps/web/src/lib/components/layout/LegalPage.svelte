<script lang="ts">
  import Reveal from '$lib/components/ui/Reveal.svelte';
  import SectionHeading from '$lib/components/ui/SectionHeading.svelte';
  import { legal, type LegalSection } from '$lib/data/legal';

  let { badge = '', title = '', subtitle = '', sections }: {
    badge?: string;
    title?: string;
    subtitle?: string;
    sections: LegalSection[];
  } = $props();
</script>

<div class="pt-28 md:pt-36">
  <section class="section-padding relative overflow-hidden">
    <div class="absolute -top-32 left-1/2 h-[480px] w-[680px] -translate-x-1/2 rounded-full bg-primary-500/20 blur-[160px] pointer-events-none"></div>
    <div class="container-x relative">
      <SectionHeading {badge} {title} {subtitle} />

      <div class="reveal mt-12 mx-auto max-w-3xl">
        <div class="glass rounded-2xl p-7 md:p-10 space-y-8">
          <p class="text-sm text-ink-light dark:text-slate-400">
            Effective date: <span class="font-medium text-ink dark:text-white">{legal.effectiveDate}</span>
          </p>

          {#each sections as section (section.heading)}
            <div>
              <h2 class="font-display text-lg font-bold text-ink dark:text-white">
                {section.heading}
              </h2>
              <div class="mt-3 space-y-3">
                {#each section.body as paragraph (paragraph)}
                  <p class="text-sm leading-relaxed text-ink-light dark:text-slate-400">
                    {paragraph}
                  </p>
                {/each}
              </div>
            </div>
          {/each}

          <p class="border-t border-slate-200/60 pt-6 text-xs text-ink-light dark:border-white/5 dark:text-slate-500">
            {legal.controller} · {legal.website}
          </p>
        </div>
      </div>
    </div>
  </section>
</div>