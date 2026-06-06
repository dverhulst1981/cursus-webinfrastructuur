import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    'intro',
    {
      type: 'category',
      label: '1. Netwerk fundamentals',
      link: {type: 'doc', id: 'hoofdstuk-1-netwerkstack-tcp-ip-fundamenten/index'},
      items: [
        'hoofdstuk-1-netwerkstack-tcp-ip-fundamenten/tcp-ip-model',
        'hoofdstuk-1-netwerkstack-tcp-ip-fundamenten/server',
        'hoofdstuk-1-netwerkstack-tcp-ip-fundamenten/linux-commandos',
        'hoofdstuk-1-netwerkstack-tcp-ip-fundamenten/linux-oefeningen',
        'hoofdstuk-1-netwerkstack-tcp-ip-fundamenten/ssh',
        'hoofdstuk-1-netwerkstack-tcp-ip-fundamenten/cloud',
        'hoofdstuk-1-netwerkstack-tcp-ip-fundamenten/vps',
        'hoofdstuk-1-netwerkstack-tcp-ip-fundamenten/statische-pagina',
        'hoofdstuk-1-netwerkstack-tcp-ip-fundamenten/troubleshooting',
        'hoofdstuk-1-netwerkstack-tcp-ip-fundamenten/oplossingen',
      ],
    },
    'hoofdstuk-2-dns',
    'hoofdstuk-3-http',
    'hoofdstuk-4-https',
    'hoofdstuk-5-docker-fundamentals-introductie-tot-containers',
    'hoofdstuk-6-dockerfiles-images',
    'hoofdstuk-7-docker-compose-container-orchestration',
    'hoofdstuk-8-ci-cd-pipelines-professionele-git-workflows',
    'hoofdstuk-9-monitoring-logging-troubleshooting-websystemen',
    'hoofdstuk-10-auteursrecht-webontwikkeling-it',
    'hoofdstuk-11-ethiek-privacy-gdpr-webinfrastructuur',
    'hoofdstuk-12-integratieproject-presentatie-verdediging-reflectie',
  ],
};

export default sidebars;
