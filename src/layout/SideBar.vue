<script setup>
import { ref } from 'vue'

const sidebarOpen = ref(true)
const isPagesMenuOpen = ref(false)

function togglePagesMenu() {
  isPagesMenuOpen.value = !isPagesMenuOpen.value
}
</script>

<style scoped>
/* Custom styles if needed */
</style>

<template>
  <aside
      :class="{
    'z-20': true,
    'block': sidebarOpen,
    'hidden': !sidebarOpen,
    'w-64 h-screen overflow-y-auto bg-white dark:bg-blue-900 md:block flex-shrink-0': true
  }"
  >

    <div class="py-4 text-gray-500 dark:text-gray-400">
      <router-link to="/">
      <a
          class="ml-6 text-lg font-bold text-blue-800 dark:text-blue-200"
      >
        Windmill
      </a>
      </router-link>
      <ul class="mt-6">
        <li class="relative px-6 py-3">
          <span
              class="absolute inset-y-0 left-0 w-1 bg-blue-600 rounded-tr-lg rounded-br-lg"
              aria-hidden="true"
          ></span>
          <a
              class="inline-flex items-center w-full text-sm font-semibold text-gray-800 transition-colors duration-150 hover:text-blue-800 dark:hover:text-blue-200 dark:text-gray-100"
              href="index.html"
          >
            <svg
                class="w-5 h-5"
                aria-hidden="true"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
              <path
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              ></path>
            </svg>
            <span class="ml-4">Dashboard</span>
          </a>
        </li>
      </ul>
      <ul>
        <li class="relative px-6 py-3">
          <RouterLink
              class="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-blue-800 dark:hover:text-blue-200"
              :to="`/employer/list`"
          >
            <svg
                class="w-5 h-5"
                aria-hidden="true"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
              <path
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
              ></path>
            </svg>
            <span class="ml-4">Employer</span>
          </RouterLink>
        </li>
        <li class="relative px-6 py-3">
          <RouterLink
              class="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-blue-800 dark:hover:text-blue-200"
              :to="`/jobPostings/list`"
          >
            <svg
                class="w-5 h-5"
                aria-hidden="true"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
              <path
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
              ></path>
            </svg>
            <span class="ml-4">Job Postings</span>
          </RouterLink>
        </li>
        <li class="relative px-6 py-3">
          <RouterLink
              class="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-blue-800 dark:hover:text-blue-200"
              :to="`/partTimer/list`"
          >
            <svg
                class="w-5 h-5"
                aria-hidden="true"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
              <path
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
              ></path>
            </svg>
            <span class="ml-4">PartTimer</span>
          </RouterLink>
        </li>
        <li class="relative px-6 py-3">
          <RouterLink
              class="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-blue-800 dark:hover:text-blue-200"
              :to="`/qna/list`"
          >
            <svg
                class="w-5 h-5"
                aria-hidden="true"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
              <path
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
              ></path>
            </svg>
            <span class="ml-4">QNA</span>
          </RouterLink>
        </li>
        <li class="relative px-6 py-3">
          <RouterLink
              class="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-blue-800 dark:hover:text-blue-200"
              :to="`/faq/list`"
          >
            <svg
                class="w-5 h-5"
                aria-hidden="true"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
              <path
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
              ></path>
            </svg>
            <span class="ml-4">FAQ</span>
          </RouterLink>
        </li>
        <li class="relative px-6 py-3">
          <RouterLink
              class="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-blue-800 dark:hover:text-blue-200"
              :to="`/qna/list`"
          >
            <svg
                class="w-5 h-5"
                aria-hidden="true"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
              <path
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
              ></path>
            </svg>
            <span class="ml-4">QNA</span>
          </RouterLink>
        </li>
        <li class="relative px-6 py-3">
          <RouterLink
              class="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-blue-800 dark:hover:text-blue-200"
              :to="`/complaints/list`"
          >
            <svg
                class="w-5 h-5"
                aria-hidden="true"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
              <path
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
              ></path>
            </svg>
            <span class="ml-4">Complaints</span>
          </RouterLink>
        </li>
        <li class="relative px-6 py-3">
          <button
              class="inline-flex items-center justify-between w-full text-sm font-semibold transition-colors duration-150 hover:text-blue-800 dark:hover:text-blue-200"
              @click="togglePagesMenu"
              aria-haspopup="true"
          >
            <span class="inline-flex items-center">
              <svg
                  class="w-5 h-5"
                  aria-hidden="true"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
              >
                <path
                    d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
                ></path>
              </svg>
              <span class="ml-4">Pages</span>
            </span>
            <svg
                class="w-4 h-4"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
            >
              <path
                  fill-rule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clip-rule="evenodd"
              ></path>
            </svg>
          </button>
          <ul
              v-show="isPagesMenuOpen"
              class="p-2 mt-2 space-y-2 overflow-hidden text-sm font-medium text-gray-500 rounded-md shadow-inner bg-gray-50 dark:text-gray-400 dark:bg-blue-800"
              aria-label="submenu"
          >
            <li
                class="px-2 py-1 transition-colors duration-150 hover:text-blue-800 dark:hover:text-blue-200"
            >
              <a class="w-full" href="pages/login.html">Login</a>
            </li>
            <li
                class="px-2 py-1 transition-colors duration-150 hover:text-blue-800 dark:hover:text-blue-200"
            >
              <a class="w-full" href="pages/create-account.html">
                Create account
              </a>
            </li>
          </ul>
        </li>
      </ul>
      <div class="px-6 my-6">
        <button
            class="flex items-center justify-between w-full px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-blue-600 border border-transparent rounded-lg active:bg-blue-600 hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue"
        >
          Create account
          <span class="ml-2" aria-hidden="true">+</span>
        </button>
      </div>
    </div>
  </aside>
</template>