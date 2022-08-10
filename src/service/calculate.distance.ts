import { Toro } from "../model/toro";
import { ToroDistance } from "../model/toro.distance";
import { GetData } from "./get.data";

export class CalculateDistance {
        constructor(private getData: GetData) {

        }

        async getDistance(lat: number, lon: number): Promise<ToroDistance> {

                var dataToros = this.getData.GetDataToros();
                var toros = dataToros.toros as Toro[];

                var torosDistance = toros
                        .map(toro => new ToroDistance(lat, lon, this.calculateDistanceBetweenPoints(lat, toro.lat, lon, toro.lon), toro))
                        .sort(toroDistance => toroDistance.distance);

                return torosDistance[0];
        }

        private calculateDistanceBetweenPoints(lat1: number, lat2: number, lon1: number, lon2: number): number {
                lon1 =  lon1 * Math.PI / 180;
                lon2 = lon2 * Math.PI / 180;
                lat1 = lat1 * Math.PI / 180;
                lat2 = lat2 * Math.PI / 180;

                // Haversine formula
                let dlon = lon2 - lon1;
                let dlat = lat2 - lat1;
                let a = Math.pow(Math.sin(dlat / 2), 2)
                                + Math.cos(lat1) * Math.cos(lat2)
                                * Math.pow(Math.sin(dlon / 2),2);
                        
                let c = 2 * Math.asin(Math.sqrt(a));

                // Radius of earth in kilometers. Use 3956
                // for miles
                let r = 6371;

                // calculate the result
                return(c * r);
        }
}