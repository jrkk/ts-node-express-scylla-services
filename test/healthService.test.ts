import { expect } from 'chai';
import { HealthService } from '../src/Services/HealthService';

describe('HealthService', () => {
  let healthService: HealthService;

  beforeEach(() => {
    healthService = new HealthService();
  });

  describe('checkHealth', () => {
    it('should return health status with OK status', async () => {
      const result = await healthService.checkHealth();

      expect(result).to.have.property('status');
      expect(result.status).to.equal('OK');
      expect(result).to.have.property('timestamp');
      expect(result).to.have.property('uptime');
      expect(result).to.have.property('environment');
    });

    it('should return a valid timestamp', async () => {
      const result = await healthService.checkHealth();
      const timestamp = new Date(result.timestamp);

      expect(timestamp).to.be.instanceOf(Date);
      expect(timestamp.getTime()).to.be.lessThanOrEqual(Date.now());
    });

    it('should return uptime as a number', async () => {
      const result = await healthService.checkHealth();

      expect(result.uptime).to.be.a('number');
      expect(result.uptime).to.be.greaterThanOrEqual(0);
    });
  });
});
