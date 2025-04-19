import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import Image from "next/image";

/**
 * Shared layout configurations
 *
 * you can customise layouts individually from:
 * Home Layout: app/(home)/layout.tsx
 * Docs Layout: app/docs/layout.tsx
 */
export const baseOptions: BaseLayoutProps = {
  nav: {
    title: (
      <>
        <Image src="/favicon.ico" alt="Logo" width={26} height={26} />
        {"Afiado"}
      </>
    ),
  },
  links: [
    {
      text: "Documentação",
      url: "/docs",
      active: "nested-url",
    },
    {
      type: "icon",
      url: "https://github.com/tmtecnologia/afiado",
      text: "GitHub",
      icon: (
        <Image
          src="/github-octocat-logo.svg"
          className="invert dark:invert-0"
          alt="GitHub"
          width={26}
          height={26}
        />
      ),
      external: true,
    },
  ],
  themeSwitch: {
    mode: 'light-dark-system'
  }
};
