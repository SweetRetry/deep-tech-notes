// 全局类型声明
interface DrawerInstance {
  id: string;
  position: string;
  isOpen: boolean;
  element: HTMLElement;
  overlay: HTMLElement;
  transformOpen: string;
  transformClose: string;
  onOpen?: () => void;
  onClose?: () => void;
}

interface DrawerManager {
  register(
    id: string,
    element: HTMLElement,
    overlay: HTMLElement,
    options: {
      position: string;
      transformOpen: string;
      transformClose: string;
      onOpen?: () => void;
      onClose?: () => void;
    }
  ): void;
  open(id: string): void;
  close(id: string): void;
  toggle(id: string): void;
  closeAll(): void;
  isOpen(id: string): boolean;
  destroy(id: string): void;
}

declare global {
  interface Window {
    drawerManager: DrawerManager;
  }
}

export {}; 