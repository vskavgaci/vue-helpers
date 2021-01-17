import Vue from 'vue';
import VueRouter from 'vue-router';
import helper from './helper.js';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/example',
      meta: {
        requiredLevel: true,
        hasPermission: true,
      },
    }
  ],
});

router.beforeEach(async (to, from, next) => {
  const metas = to.matched.map((e) => e.meta).filter((e) => Object.keys(e).length);

  const functions = {};
  const fails = [];

  for (const meta of metas) {
    Object.keys(meta).forEach((key) => {
      functions[key] = meta[key];
    });
  }

  for (const key of Object.keys(functions)) {
    const status = await helper[key](functions[key]);

    if (status) {
      fails.push(status);
    }
  }

  if (fails.length) {
    next(fails[0]);
  } else {
    next();
  }
});

export default router;
