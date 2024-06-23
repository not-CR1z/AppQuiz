import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const quizGuard = () => {

  const router = inject(Router);

  if (localStorage.getItem("token")) {
    return true
  } else {
    router.navigate(['/login']);
    return false;
  }
};
