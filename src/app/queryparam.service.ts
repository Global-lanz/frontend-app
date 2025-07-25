//CopyPasta from https://software-engineering-corner.zuehlke.com/two-way-binding-between-signals-and-query-params

import { computed, effect, inject, Injectable, signal } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { filter, firstValueFrom, timeout } from "rxjs";

@Injectable({ providedIn: "root" })
export class QueryParamService {
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);

  private allQueryParams = toSignal(this.activatedRoute.queryParams);

  get(queryParamName: string) {
    const activatedRouteValue = computed(() => this.allQueryParams()?.[queryParamName]);
    const queryParamValue = signal(activatedRouteValue());

    effect(() => queryParamValue.set(activatedRouteValue()));

    effect(async () => {
      const newValueToPushInRoute = queryParamValue();

      if (!this.router.navigated) return;
      while (this.isRouterNavigating()) await this.waitUntilRouterIsIdle();

      this.router.navigate([], {
        queryParams: { [queryParamName]: newValueToPushInRoute },
        queryParamsHandling: "merge",
      });
    });

    return queryParamValue;
  }

  private isRouterNavigating() {
    return this.router.getCurrentNavigation() !== null;
  }

  private waitUntilRouterIsIdle(): Promise<unknown> {
    return firstValueFrom(
      this.router.events.pipe(
        filter((e) => e instanceof NavigationEnd),
        timeout(1_000)
      )
    );
  }
}
