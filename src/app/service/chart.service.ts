import { Injectable } from '@angular/core';

@Injectable()
export class ChartService {

  constructor() { }

  dataCount(arr) {
    var a = [], b = [], prev;
    
    arr.sort();
        for ( var i = 0; i < arr.length; i++ ) {
            if ( arr[i] !== prev ) {
                a.push(arr[i]);
                b.push(1);
            } else {
                b[b.length-1]++;
            }
            prev = arr[i];
        }
        return [a, b];
    }

     dataCount2(arr:Array<any>, arr2:Array<any>) {
    let a = [], b = [];
    let x = 0;

    // for(let i = 0; i < arr.length; i++){
    //     console.log(arr[i][0]);
    //     a.push(arr[i][0]);
    //     for(let j=0; j< arr2.length; i++){
    //         if(arr[i][0] === arr[j][0])
    //             x+=arr[j][1];
    //     }
    //     x/=arr[i][1];
    //     b.push(x);
    // }
        return [a, b];
    }
}
