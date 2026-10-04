import { LocalCollectionRepository } from "@/repositories/core/local-repository";
import type { Repository } from "@/repositories/core/repository";
import { seedNotifications } from "@/data/seed";
import type { AppNotification } from "./types";

export interface NotificationRepository extends Repository<AppNotification> {
  markAllRead(): Promise<void>;
}

export class LocalNotificationRepository
  extends LocalCollectionRepository<AppNotification>
  implements NotificationRepository
{
  constructor() {
    super("notifications", seedNotifications, "ntf");
  }

  async markAllRead(): Promise<void> {
    const items = await this.read();
    await this.write(items.map((n) => ({ ...n, read: true })));
  }
}
