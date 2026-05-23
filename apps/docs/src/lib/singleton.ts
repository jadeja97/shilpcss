/**
 * single instance for a unique key
 */
class Singleton {
  //
  private static readonly instances = new Map<string, Singleton>();

  public static get<T extends Singleton>(key: string): T {
    //
    let instance = Singleton.instances.get(key);

    if (!instance) {
      instance = new this();

      Singleton.instances.set(key, instance);
    }

    return instance as T;
  }

  /* =========================
		HANDLE PROPERTIES
	========================= */

  public set<K extends keyof this>(key: K, value: (typeof this)[K]) {
    this[key] = value;
  }

  public get<K extends keyof this>(key: K) {
    return this[key];
  }

  /* =========================
		HANDLE METHODS
	========================= */

  public register<T>(instance: T, key: string) {
    //
    const fn = instance[key as keyof T];

    if (typeof fn === "function") {
      this.set(key as keyof this, fn.bind(this) as this[keyof this]);
    }
  }

  public registerMethods<T>(instance: T, methods: string[]) {
    for (const method of methods) {
      //
      this.register(instance, method);
    }
  }
}

/* ============================================================================================= */

export default Singleton;
