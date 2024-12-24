import { Inspection } from './inspection';

describe('Inspection', () => {
  it('should be able to create an inspection vehicle', () => {
    const inspection = new Inspection({
      inspectionDate: new Date(),
      driver: 'John Doe',
      licensePlate: 'ABC1234',
      brandModel: 'Toyota Corolla',
      yearModel: '2020',
      color: 'Blue',
      category: 'Sedan',
      tireSpare: 1,
      glassMirrors: 2,
      taillights: 2,
      headlights: 2,
      directionSignal: 2,
      frontRearSeats: 4,
      seatBelt: 4,
      airConditioning: 1,
      trunk: 1,
      alcoholGelMask: 1,
      driverAcceptanceDate: new Date(),
      driverSignatureDate: new Date(),
      userId: 'user123',
    });

    expect(inspection).toBeTruthy();
  });
});
