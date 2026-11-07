<script lang="ts">
  import { ArrowUpRight } from 'lucide-svelte';
  import Reveal from '$lib/components/ui/Reveal.svelte';
  import { getFeaturedProjects } from '$lib/data/projects';
  const featured = getFeaturedProjects();
</script>

<section class="section-padding bg-[#e9e9df] dark:bg-[#191d17]">
  <div class="container-x">
    <Reveal>
      <div class="mb-14 flex flex-col justify-between gap-6 border-b border-ink/20 pb-8 dark:border-white/15 md:flex-row md:items-end">
        <div><p class="mb-4 text-[11px] font-bold uppercase tracking-[.22em] text-primary-700 dark:text-primary-300">Selected work / 01—04</p><h2 class="max-w-2xl font-display text-4xl font-semibold leading-[1.02] tracking-[-.055em] text-ink dark:text-white sm:text-6xl">Digital products<br/>with purpose.</h2></div>
        <a href="/portfolio" class="inline-flex items-center gap-2 text-sm font-semibold text-ink transition-colors hover:text-primary-700 dark:text-white dark:hover:text-primary-300">View all projects <ArrowUpRight size={17}/></a>
      </div>
    </Reveal>

    <div class="space-y-12 md:space-y-16">
      {#each featured as project, i (project.id)}
        <Reveal>
          <div class="group grid gap-6 md:grid-cols-[1.35fr_.65fr] md:items-center md:gap-12">
            <a href="/portfolio/{project.slug}" class="project-visual aspect-[16/10] block">
              {#if project.image_url}
                <img src={project.image_url} alt={project.title} loading="lazy" class="transition-transform duration-700 ease-out group-hover:scale-[1.06]"/>
              {:else}
                <div class="flex h-full items-center justify-center"><span class="font-display text-[clamp(5rem,15vw,12rem)] font-semibold tracking-[-.09em] text-ink/10 dark:text-white/10">{project.title.slice(0,2).toUpperCase()}</span></div>
              {/if}
              
              <span class="absolute bottom-5 right-5 flex h-12 w-12 items-center justify-center rounded-full bg-primary-400 text-ink transition-transform duration-300 group-hover:rotate-45"><ArrowUpRight size={21}/></span>
            </a>
            <div class="flex flex-col justify-center">
              <p class="mb-4 text-[11px] font-bold uppercase tracking-[.2em] text-primary-700 dark:text-primary-300">{String(i+1).padStart(2,'0')} / {project.category}</p>
              <a href="/portfolio/{project.slug}"><h3 class="font-display text-3xl font-semibold leading-[1.04] tracking-[-.05em] text-ink transition-colors group-hover:text-primary-700 dark:text-white dark:group-hover:text-primary-300 sm:text-4xl">{project.title}</h3></a>
              <p class="mt-5 max-w-lg text-base leading-7 text-ink-light dark:text-slate-300">{project.description}</p>{#if project.demo_url}<a href={project.demo_url} target="_blank" rel="noopener noreferrer" class="mt-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.14em] text-primary-700 hover:underline dark:text-primary-300">Visit {project.title} website <ArrowUpRight size={14}/></a>{/if}
              <div class="mt-7 flex flex-wrap gap-x-4 gap-y-2 border-t border-ink/15 pt-4 dark:border-white/15">{#each project.tech_tags.slice(0,4) as tag}<span class="text-[10px] font-semibold uppercase tracking-[.14em] text-ink-light dark:text-slate-400">{tag}</span>{/each}</div>
            </div>
          </div>
        </Reveal>
      {/each}
    </div>
  </div>
</section>