import { Controller, Get } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckService,
  MemoryHealthIndicator,
  DiskHealthIndicator,
} from '@nestjs/terminus';

const MAX_HEAP_MEMORY = 590 * 1024 * 1024; // 500MB
const MAX_DISK_STORAGE = 0.9; // 90%

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private memory: MemoryHealthIndicator,
    private disk: DiskHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      // Check memory usage
      () => this.memory.checkHeap('memory_heap', MAX_HEAP_MEMORY),
      // Check disk storage
      () =>
        this.disk.checkStorage('disk_storage', {
          path: '/',
          thresholdPercent: MAX_DISK_STORAGE,
        }),
    ]);
  }
}
