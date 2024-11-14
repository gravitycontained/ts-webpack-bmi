import { BaseComponent, UniqueIdElement } from '../../util';


import template from './output.html';
import './output.scss';

export class OutputComponent
extends BaseComponent
{
  private output: UniqueIdElement<HTMLElement>;

	public constructor()
	{
    super('output-component', template);

    this.output = new UniqueIdElement(this.element, 'result');
	}

  public setOutput(value: string | number)
  {
    this.output.get().innerHTML = `${value}`;
  }
}
