import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-sandbox',
    templateUrl: './sandbox.component.html',
    styleUrls: ['./sandbox.component.css']
})
export class SandboxComponent implements OnInit {

    constructor() { }

    ngOnInit() {
        const oddNumbers = [1, 3, 5];
        
        const oneToSix = oddNumbers.map(x => [x, x + 1]);
        
        console.log(oneToSix);
        
        console.log(this.flatten(oneToSix)); // -> [[ 1, 2], [3, 4], [5, 6]]

        console.log(this.flatten1(oneToSix)); // -> [[ 1, 2], [3, 4], [5, 6]]
        
        console.log([10, 11, 12, 13, 14, 15]);
    }
    
    // reduce arg1 - callback function
    //        arg2 - item
    flatten1 (arr): string {
        
        return arr.reduce((flatArr, x) => flatArr += x[0],
                            100)
    }
    
    
    flatten (arr): string {
        return arr.reduce((flatArr, subArray) => flatArr.concat(subArray), [])
    }

}
