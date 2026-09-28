<script lang="ts">
  import { page } from '$app/state';
  import { ExternalLink, Github, MessageCircle, Mail, Phone, Star, Share2, ArrowLeft } from 'lucide-svelte';
  import Reveal from '$lib/components/ui/Reveal.svelte';
  import Badge from '$lib/components/ui/Badge.svelte';
  import { getProjectBySlug } from '$lib/data/projects';
  import { site } from '$lib/config';

  const slug = $derived(page.params.slug ?? '');
  const project = $derived(getProjectBySlug(slug));

  const shareTitle = $derived(project ? `${project.title} — Elevate Media Productions` : '');
  const shareUrl = $derived((project ? `https://elevate-media-productions.vercel.app/portfolio/${project.slug}` : ''));

  const redditUrl = $derived(shareUrl ? `https://www.reddit.com/submit?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(shareTitle)}` : '');
  const linkedinUrl = $derived(shareUrl ? `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}` : '');

  const whatsappLink = $derived(`https://wa.me/254775333673?text=${encodeURIComponent(`Hi, I'm interested in a project like ${project?.title}.`)}`);
  const emailLink = $derived(`mailto:${site.email}?subject=${encodeURIComponent(`Project inquiry — ${project?.title}`)}`);
</script>

<svelte:head>
  <title>{project?.title ?? 'Project'} — Elevate Media Productions</title>
  <meta name="description" content={project?.description} />
</svelte:head>

{#if project}
  <div class="pt-28 md:pt-36">
    <section class="section-padding relative overflow-hidden">
      <div class="absolute -top-32 left-1/2 h-[480px] w-[680px] -translate-x-1/2 rounded-full bg-primary-500/20 blur-[160px] pointer-events-none"></div>
      <div class="container-x relative">
        <Reveal>
          <a href="/portfolio" class="group mb-10 inline-flex items-center gap-2 text-sm text-ink-light transition-colors hover:text-ink dark:text-slate-400 dark:hover:text-white">
            <ArrowLeft size={16} class="transition-transform group-hover:-translate-x-1" />
            Back to portfolio
          </a>
        </Reveal>

        <div class="mx-auto max-w-4xl">
          <Reveal>
            <div class="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <Badge>{project.category}</Badge>
                <h1 class="mt-3 font-display text-3xl font-bold text-ink dark:text-white sm:text-4xl md:text-5xl">
                  {project.title}
                </h1>
              </div>
              <div class="flex gap-3">
                {#if project.demo_url}
                  <a href={project.demo_url} target="_blank" rel="noopener noreferrer" class="btn-gradient !px-5 !py-2.5 !text-sm">
                    <ExternalLink size={15} /> Live demo
                  </a>
                {/if}
                {#if project.github_url}
                  <a href={project.github_url} target="_blank" rel="noopener noreferrer" class="btn-outline !px-5 !py-2.5 !text-sm !text-ink dark:!text-slate-200">
                    <Github size={15} /> Source code
                  </a>
                {/if}
              </div>
            </div>
          </Reveal>

          {#if project.screenshots.length > 0}
            <Reveal>
              <div class="grid gap-5 sm:grid-cols-2">
                {#each project.screenshots as shot, i}
                  <figure
                    class="glass group relative overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary-500/10"
                    class:sm:col-span-2={i === 0}
                  >
                    <img
                      src={shot}
                      alt={`${project.title} screenshot ${i + 1}`}
                      loading="lazy"
                      class="aspect-[16/10] w-full object-cover object-top"
                    />
                  </figure>
                {/each}
              </div>
            </Reveal>
          {:else}
            <Reveal>
              <div class="glass overflow-hidden rounded-2xl bg-gradient-to-br from-primary-500/20 via-emerald-500/10 to-secondary-500/20">
                <div class="flex h-64 items-center justify-center text-5xl font-bold font-display text-primary-500/15 dark:text-primary-500/10 sm:h-80">
                  {project.title.slice(0, 2).toUpperCase()}
                </div>
              </div>
            </Reveal>
          {/if}

          <Reveal>
            <div class="glass mt-8 rounded-2xl p-8 md:p-10">
              <h2 class="mb-4 font-display text-xl font-bold text-ink dark:text-white">About this project</h2>
              <p class="text-ink-light dark:text-slate-300 leading-relaxed">
                {project.long_description ?? project.description}
              </p>
              <div class="mt-6 flex flex-wrap gap-2">
                {#each project.tech_tags as tag}
                  <span class="rounded-lg bg-ink/5 px-3 py-1.5 text-sm font-medium text-ink-light dark:bg-white/5 dark:text-slate-400">
                    {tag}
                  </span>
                {/each}
              </div>
            </div>
          </Reveal>

          <Reveal>
            <div class="glass mt-8 rounded-2xl p-8 md:p-10">
              <h2 class="mb-2 font-display text-xl font-bold text-ink dark:text-white">Show some love</h2>
              <p class="mb-6 text-sm text-ink-light dark:text-slate-400">
                Star it on GitHub, share it with your network, or talk to us about bringing something like this to life for you.
              </p>

              <div class="grid gap-3 sm:grid-cols-3">
                <a
                  href={project.github_url ?? '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  class="flex items-center justify-center gap-2 rounded-xl border border-ink/10 bg-white/50 px-4 py-3 text-sm font-medium text-ink transition-all hover:-translate-y-0.5 hover:bg-white hover:shadow-md dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-white/10"
                >
                  <Star size={16} /> Star on GitHub
                </a>
                <a
                  href={redditUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  class="flex items-center justify-center gap-2 rounded-xl border border-ink/10 bg-white/50 px-4 py-3 text-sm font-medium text-ink transition-all hover:-translate-y-0.5 hover:bg-white hover:shadow-md dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-white/10"
                >
                  <Share2 size={16} /> Share on Reddit
                </a>
                <a
                  href={linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  class="flex items-center justify-center gap-2 rounded-xl border border-ink/10 bg-white/50 px-4 py-3 text-sm font-medium text-ink transition-all hover:-translate-y-0.5 hover:bg-white hover:shadow-md dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-white/10"
                >
                  <Share2 size={16} /> Share on LinkedIn
                </a>
              </div>

              <div class="mt-8 border-t border-ink/5 pt-6 dark:border-white/5">
                <h3 class="mb-4 font-display text-lg font-bold text-ink dark:text-white">
                  Want something like this built for you?
                </h3>
                <div class="flex flex-col gap-3 sm:flex-row">
                  <a href={whatsappLink} target="_blank" rel="noopener noreferrer" class="btn-gradient flex-1 !px-5 !py-3 !text-sm">
                    <MessageCircle size={16} /> WhatsApp us
                  </a>
                  <a href={emailLink} class="btn-outline flex-1 !px-5 !py-3 !text-sm !text-ink dark:!text-slate-200">
                    <Mail size={16} /> Email us
                  </a>
                  <a href="tel:+254111275630" class="btn-outline flex-1 !px-5 !py-3 !text-sm !text-ink dark:!text-slate-200">
                    <Phone size={16} /> Call us
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  </div>
{:else}
  <div class="flex min-h-screen items-center justify-center">
    <p class="text-ink-light dark:text-slate-400">Project not found.</p>
  </div>
{/if}