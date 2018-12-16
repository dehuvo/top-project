import { Component, Input } from '@angular/core';
import { OrgChartComponent } from '../org-chart.component'
import { Dept } from '../../emp-dept.model';

@Component({
  selector: 'tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css']
})
export class TreeComponent {
  constructor(private parent: OrgChartComponent) {}
  @Input() depts: Dept[];
  @Input() manager: boolean;
}