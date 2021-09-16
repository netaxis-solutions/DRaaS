import { makeObservable, observable } from 'mobx';

class Route {
  enabledOnServer: boolean = false;
  enabledOnClient: boolean = false;

  path: string | undefined = '';
  name: string = '';

  publicSidebar: object | null = null;

  constructor(
    enabledOnClient: boolean,
    sidebar: object | null,
    path: string | undefined,
    name: string
  ) {
    makeObservable(this, {
      enabledOnServer: observable,
      enabledOnClient: observable,
      publicSidebar: observable.ref,
    });
    this.enabledOnClient = enabledOnClient;
    this.path = path;
    this.publicSidebar = sidebar;
    this.name = name;
  }

  //TODO use when filtering depending on server checks should be enabled
  //   destroyServerEnabledObserver = onBecomeObserved(
  //     this,
  //     "enabledOnServer",
  //     async () => {
  //       // const allowedOnServer = await doServerCheck();
  //       // this.enabledOnServer = allowedOnServer;
  //     }
  //   );
  //   destroy() {
  //     this.destroyServerEnabledObserver();
  //   }

  get sidebar() {
    return this.publicSidebar
      ? Object.keys(this.publicSidebar).reduce((prev: object, cur: string) => {
          this.publicSidebar?.[cur as keyof object][
            'enabled' as keyof object
          ] &&
            (prev[cur as keyof object] = this.publicSidebar[
              cur as keyof object
            ]);

          return prev;
        }, {})
      : null;
  }

  get enabled() {
    return this.sidebar
      ? Object.keys(this.sidebar).length && this.enabledOnClient
      : this.enabledOnClient;
  }
}

export default Route;
