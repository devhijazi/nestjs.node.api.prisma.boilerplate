import { Replace } from '@/helpers/Replace';
import { Entity } from '@/core/entities/entity';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';

export interface InspectionProps {
  inspectionDate: Date;
  inspectorSignature?: string | null;
  driver: string;
  licensePlate: string;
  brandModel: string;
  yearModel: string;
  color: string;
  category: string;
  observations?: string | null;
  tireSpare: number;
  glassMirrors: number;
  taillights: number;
  headlights: number;
  directionSignal: number;
  frontRearSeats: number;
  seatBelt: number;
  airConditioning: number;
  trunk: number;
  alcoholGelMask: number;
  driverAcceptanceDate: Date;
  driverSignature?: string | null;
  driverSignatureDate: Date;
  userId: string;
}

export class Inspection extends Entity<InspectionProps> {
  constructor(
    props: Replace<
      InspectionProps,
      {
        inspectionDate?: Date;
        driverAcceptanceDate?: Date;
        driverSignatureDate?: Date;
      }
    >,
    id?: UniqueEntityID,
  ) {
    super(
      {
        ...props,
        inspectionDate: props.inspectionDate ?? new Date(),
        driverAcceptanceDate: props.driverAcceptanceDate ?? new Date(),
        driverSignatureDate: props.driverSignatureDate ?? new Date(),
      },
      id,
    );
  }
  public get inspectionDate(): Date {
    return this.props.inspectionDate;
  }

  public set inspectionDate(inspectionDate: Date) {
    this.props.inspectionDate = inspectionDate;
  }

  public get inspectorSignature(): string | null | undefined {
    return this.props.inspectorSignature;
  }

  public set inspectorSignature(inspectorSignature: string | null | undefined) {
    this.props.inspectorSignature = inspectorSignature;
  }

  public get driver(): string {
    return this.props.driver;
  }

  public set driver(driver: string) {
    this.props.driver = driver;
  }

  public get licensePlate(): string {
    return this.props.licensePlate;
  }

  public set licensePlate(licensePlate: string) {
    this.props.licensePlate = licensePlate;
  }

  public get brandModel(): string {
    return this.props.brandModel;
  }

  public set brandModel(brandModel: string) {
    this.props.brandModel = brandModel;
  }

  public get yearModel(): string {
    return this.props.yearModel;
  }

  public set yearModel(yearModel: string) {
    this.props.yearModel = yearModel;
  }

  public get color(): string {
    return this.props.color;
  }

  public set color(color: string) {
    this.props.color = color;
  }

  public get category(): string {
    return this.props.category;
  }

  public set category(category: string) {
    this.props.category = category;
  }

  public get observations(): string | null | undefined {
    return this.props.observations;
  }

  public set observations(observations: string | null | undefined) {
    this.props.observations = observations;
  }

  public get tireSpare(): number {
    return this.props.tireSpare;
  }

  public set tireSpare(tireSpare: number) {
    this.props.tireSpare = tireSpare;
  }

  public get glassMirrors(): number {
    return this.props.glassMirrors;
  }

  public set glassMirrors(glassMirrors: number) {
    this.props.glassMirrors = glassMirrors;
  }

  public get taillights(): number {
    return this.props.taillights;
  }

  public set taillights(taillights: number) {
    this.props.taillights = taillights;
  }

  public get headlights(): number {
    return this.props.headlights;
  }

  public set headlights(headlights: number) {
    this.props.headlights = headlights;
  }

  public get directionSignal(): number {
    return this.props.directionSignal;
  }

  public set directionSignal(directionSignal: number) {
    this.props.directionSignal = directionSignal;
  }

  public get frontRearSeats(): number {
    return this.props.frontRearSeats;
  }

  public set frontRearSeats(frontRearSeats: number) {
    this.props.frontRearSeats = frontRearSeats;
  }

  public get seatBelt(): number {
    return this.props.seatBelt;
  }

  public set seatBelt(seatBelt: number) {
    this.props.seatBelt = seatBelt;
  }

  public get airConditioning(): number {
    return this.props.airConditioning;
  }

  public set airConditioning(airConditioning: number) {
    this.props.airConditioning = airConditioning;
  }

  public get trunk(): number {
    return this.props.trunk;
  }

  public set trunk(trunk: number) {
    this.props.trunk = trunk;
  }

  public get alcoholGelMask(): number {
    return this.props.alcoholGelMask;
  }

  public set alcoholGelMask(alcoholGelMask: number) {
    this.props.alcoholGelMask = alcoholGelMask;
  }

  public get driverAcceptanceDate(): Date {
    return this.props.driverAcceptanceDate;
  }

  public set driverAcceptanceDate(driverAcceptanceDate: Date) {
    this.props.driverAcceptanceDate = driverAcceptanceDate;
  }

  public get driverSignature(): string | null | undefined {
    return this.props.driverSignature;
  }

  public set driverSignature(driverSignature: string | null | undefined) {
    this.props.driverSignature = driverSignature;
  }

  public get driverSignatureDate(): Date {
    return this.props.driverSignatureDate;
  }

  public set driverSignatureDate(driverSignatureDate: Date) {
    this.props.driverSignatureDate = driverSignatureDate;
  }

  public get userId(): string {
    return this.props.userId;
  }

  public set userId(userId: string) {
    this.props.userId = userId;
  }

  static create(props: InspectionProps, id?: UniqueEntityID) {
    const inspection = new Inspection(props, id);
    return inspection;
  }
}
