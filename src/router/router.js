import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/auth/login",
      component: () => import("../components/auth/AppLogin.vue"),
      name: "login",
    },
    {
      path: "/auth/register",
      component: () => import("../components/auth/CreateAccount.vue"),
      name: "register",
    },
    {
      path: "/auth/enter-code",
      component: () => import("../components/auth/EnterCode.vue"),
      name: "enterCode",
    },
    {
      path: "/auth/check-email",
      component: () => import("../components/auth/CheckEmail.vue"),
      name: "checkEmail",
    },
    {
      path: "/auth/email-sent",
      component: () => import("../components/auth/EmailSent.vue"),
      name: "emailSent",
    },
    {
      path: "/auth/password-reset",
      component: () => import("../components/auth/PasswordReset.vue"),
      name: "passwordReset",
    },
    {
      path: "/main/account",
      component: () => import("../pages/PersonalAccount.vue"),
      name: "personal",
    },
    {
      path: "/main/new-company",
      component: () => import("../pages/NewCompany.vue"),
      name: "newCompany",
    },
    {
      path: "/main/info-company",
      component: () => import("../pages/InfoCompany.vue"),
      name: "infoCompany",
    },
    {
      path: "/main/support",
      component: () => import("../pages/AppSupport.vue"),
      name: "support",
    },
    {
      path: "/main/support/open",
      component: () => import("../pages/SupportOpen.vue"),
      name: "supportOpen",
    },
    {
      path: "/main/legal-info",
      component: () => import("../pages/LegalInfo.vue"),
      name: "legalInfo",
    },
    {
      path: "/main/chat",
      component: () => import("../pages/chat/AppChat.vue"),
      name: "chat",
    },
  ],
});

export default router;
