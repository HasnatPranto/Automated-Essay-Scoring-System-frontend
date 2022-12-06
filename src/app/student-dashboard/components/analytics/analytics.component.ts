import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexTitleSubtitle,
  ApexXAxis,
  ApexFill,
  ApexLegend,
} from 'ng-apexcharts';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { StudentService } from '../../services/student.service';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent implements OnInit {

  @ViewChild('chart') chart!: ChartComponent;
  dataAvailable = false;
  tradeStatData: Number[] = [20,6,2];
  pieChartData: Number[] = [];
  tradeStatDataLabel!: any;
  today!: Date;
  public lineChartOptions!: Partial<ChartOptions> | any;
  public pieChartOptions!: Partial<ChartOptions> | any;

  performanceMatrix!:any;


  constructor(private route: ActivatedRoute, private studentService: StudentService, private authService: AuthenticationService, private toast: ToastrService) { }

  ngOnInit(): void {
    this.performanceMatrix = {};
    this.performanceMatrix.sid = this.route.snapshot.params['sid'];
    this.getAnalyticsData();
  }

  getAnalyticsData(){
    this.performanceMatrix.student = this.authService.getSessionInfo().fullname;
    this.studentService.analyticsData(this.performanceMatrix.sid).subscribe((resp:any)=>{
      if(resp.success){
        this.performanceMatrix = resp.data;
        this.performanceMatrix.student = this.authService.getSessionInfo().fullname;
        this.performanceMatrix.sid = this.route.snapshot.params['sid'];
        console.log(this.performanceMatrix)
        this.setPieChart();
        this.setlineChart();
      }
      else this.toast.error('Something went wrong! Try again later!');
    })
  }

  getScoreCount(min:number,max:number){
    return this.performanceMatrix?.scores.filter((val:any) => val>=min && val<max ).length;

  }
  setPieChart() {
    this.pieChartOptions = {
      series: [this.getScoreCount(0,4),this.getScoreCount(4,7),this.getScoreCount(7,10)],//this.tradeStatData,
      chart: {
        type: 'donut',
        height: 350,
        width: 500,
        stacked: true,
      },
      labels: ['Poor (0-4)', 'Average (4-7)', 'Excellent (7-10)'],
      dataLabels: {
        enabled: true,
        formatter: function (val: any) {
          return val.toFixed(2) + '%';
        },
      },
      plotOptions: {
        pie: {
          donut: {
            size: '70%',
          },
        },
      },
      stroke: {
        width: 1,
        colors: ['#fff'],
      },
      legend: {
        show: true,
      },
      colors: [ '#ad0c1c', '#f27916', '#015921'],
      fill: {
        colors: [ '#ad0c1c', '#f27916','#015921'],
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 400,
            },
          },
        },
      ],
    };
  }

  setlineChart(){

    let dates:any = []
    let scores:any=[]
    this.performanceMatrix.score_date.forEach((e:any)=>{
      dates.push(e.date)
      scores.push(e.score)
    });
    console.log(dates)
    // let kvalue: any = [];
    // let date: any = [];
    // kdata.forEach((element: any) => {
    //    kvalue.push(element["k-value"].toFixed(2));
    //    date.push(element["date"]);
    // });
    // console.log(kvalue)
    this.lineChartOptions = {
      series:[
        {
          name : "Score",
          data: scores
        },

      ],
      chart: {
        type: "line",
        height: 350,
        width: 500
      },
      // title: {
      //   text: "Stochastic Oscilator (14-day period)",
      //   align: "center"
      // },
      colors:['#4287f5'],
      stroke: {
        width: [2],
        //dashArray: [0, 0, 4,4]
      },
      legend: {
        show: true,
        position: 'top',
        horizontalAlign:'right',
        markers: {
          width: 40,
          height: 8,
          strokeWidth: 0,
          radius: 0,
          customHTML: undefined,
          onClick: undefined,
          offsetX: 0,
          offsetY: 0
      },

      },
      xaxis: {

        type: "datetime",
        categories: dates,
        label: {
          show: true,
          text: 'Rally',
          style: {
            color: "#fff",
            background: '#775DD0'
          }
        }
      },
      yaxis: [{
        title: {
          text: 'Score',
          offsetX: 0,
          offsetY: 0,
          style: {
              color: '#000',
              fontSize: '15px',
              // fontFamily: 'Helvetica, Arial, sans-serif',
               fontWeight: 500,
               //cssClass: 'apexcharts-xaxis-title',
          },
      },
      //   axisBorder: {
      //     show: true,
      //     color: '#78909C',
      //     offsetX: 0,
      //     offsetY: 2
      // },
        seriesName: 'Score',
        min: 0,
        max: 10,
        labels: {
            formatter: function (val:any) {
                if(val) return val.toFixed(2)
            }
        },
        tooltip: {
          enabled: true
        }
    }]
    }

  }
}
