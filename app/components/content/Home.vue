<template>
  <section class="relative sm:-mt-[50px]">
    <!-- hero -->
    <section class="relative overflow-hidden bg-[#010101] pt-12">
      <!-- dots and soft light-to-dark background treatment -->
      <DotPattern
        aria-hidden="true"
        class="pointer-events-none absolute inset-0 size-full fill-white/[0.06] [mask-image:linear-gradient(to_bottom,white_0%,white_68%,transparent_100%)]"
      />
      <div class="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.14),transparent_62%)]" />

      <div class="relative mx-auto flex max-w-7xl flex-col justify-center gap-4 px-4 pb-20 pt-8 sm:px-6 lg:px-8 lg:pb-24 lg:pt-16">
        <!-- spotlight -->
        <div
          class="absolute -right-20 top-0 size-72 rounded-full bg-white/20 blur-[120px] lg:-right-24 lg:top-4 lg:size-[32rem] lg:blur-[200px]"
        />

        <div class="relative z-20 grid items-center gap-12 lg:min-h-[calc(100vh-8rem)] lg:grid-cols-[minmax(0,1.05fr)_minmax(20rem,0.95fr)] lg:gap-20">
          <div class="order-1 flex flex-col items-start justify-center text-left">
            <!-- title -->
            <div
              class="font-geist"
              style="--stagger: 1; --delay: 10ms"
              data-animate
            >
              <h1 class="max-w-2xl text-pretty bg-gradient-to-b from-white/95 to-white/45 bg-clip-text text-left text-4xl font-medium leading-[1.05] tracking-tight text-transparent sm:text-5xl lg:text-7xl">
                <slot
                  name="hero_title"
                  mdc-unwrap="p"
                />
              </h1>

              <!-- subtitle -->
              <h2 class="mt-6 max-w-2xl text-left text-lg leading-8 antialiased text-white/60 sm:text-xl">
                <slot
                  name="hero_subtitle"
                  mdc-unwrap="p"
                />
              </h2>
            </div>

            <SettingsAvailability
              background
              class="mt-8"
              style="--stagger: 2"
              data-animate
            />

            <!-- social -->
            <HomeSocial
              style="--stagger: 3"
              data-animate
            />

            <!-- cta -->
            <HomeCTA
              style="--stagger: 4"
              data-animate
            />
          </div>

          <!-- profile picture -->
          <HomeProfilePicture class="order-2" />
        </div>
      </div>
    </section>

    <!-- experience and projects -->
    <section class="relative overflow-hidden bg-[linear-gradient(to_bottom,#010101_0%,#080808_18rem)]">
      <!-- Shelve-inspired section bridge -->
      <div class="pointer-events-none absolute inset-x-0 top-0 h-56 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.12),transparent_72%)]" />
      <DotPattern
        aria-hidden="true"
        class="pointer-events-none absolute inset-0 size-full fill-white/[0.055] [mask-image:linear-gradient(to_bottom,white_0%,white_78%,transparent_100%)]"
      />

      <div class="relative mx-auto flex max-w-7xl flex-col justify-center gap-4 px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div
          style="--stagger: 5"
          data-animate
          class="z-20 flex w-full max-w-3xl flex-col gap-4 self-center"
        >
          <!-- work experience -->
          <slot
            name="experiences"
            mdc-unwrap="p"
          />

          <!-- projects -->
          <HomeProjects />
        </div>

        <Divider class="my-9" />

        <HomeFaq
          style="--stagger: 6"
          data-animate
        />
      </div>
    </section>
  </section>
</template>
