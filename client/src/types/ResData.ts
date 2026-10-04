export type ResData<T> =
    | {
          success: false;
          message: string;
      }
    | { success: true; data: T };
