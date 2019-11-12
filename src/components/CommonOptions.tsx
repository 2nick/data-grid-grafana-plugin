import React, { Component } from 'react';
import { Options } from 'types';
import { Switch, getTheme, GrafanaThemeType } from '@grafana/ui';
import { FORM_ELEMENT_WIDTH, LABEL_WIDTH } from '../consts';
import FormSelect from './FormSelect';

type ICommonOptions = Omit<Options, 'templates'>;

type Props = {
  options: ICommonOptions;
  labels?: string[];
  loading?: boolean;
  onChange: (options: ICommonOptions) => void;
};

const theme = getTheme(GrafanaThemeType.Dark);
const ERROR_INFO_STYLE = {
  color: theme.colors.critical,
  fontSize: '14px',
  flex: 1,
  alignSelf: 'center',
  marginLeft: '7px',
};

const WARN_INFO_STYLE = {
  ...ERROR_INFO_STYLE,
  color: theme.colors.warn,
};

const ICON_STYLE = {
  marginRight: '7px',
};

export default class CommonOptions extends Component<Props> {
  private handleHideHeadersChange = (event?: React.SyntheticEvent) => {
    this.props.onChange({
      ...this.props.options,
      // @ts-ignore
      hideHeaders: event ? event.target.checked : false,
    });
  }

  private handleGroupBySelect = (event: React.SyntheticEvent) => {
    this.props.onChange({
      ...this.props.options,
      // @ts-ignore
      groupByLabel: event.target.value,
    });
  }

  public shouldComponentUpdate(nextProps: Readonly<Props>): boolean {
    return (
      this.props.options.hideHeaders !== nextProps.options.hideHeaders ||
      this.props.options.groupByLabel !== nextProps.options.groupByLabel ||
      this.props.labels !== this.props.labels
    );
  }

  private renderErrorInfo(text: string, error?: boolean) {
    return (
      <span style={error ? ERROR_INFO_STYLE : WARN_INFO_STYLE}>
        <i className="fa fa-exclamation-triangle" style={ICON_STYLE} />
        {text}
      </span>
    );
  }

  public render() {
    const { options, labels = [], loading } = this.props;
    const selectOptions = labels.map(label => ({ value: label }));

    return (
      <div className="edit-tab-content">
        <div className="editor-row">
          <div className="section gf-form-group">
            <div className="gr-form-inline">
              <div className="gf-form">
                <h6 className="text-header">Common Options</h6>
              </div>
            </div>
            <div className="gf-form">
              <div className="gr-form-inline">
                <div className="gf-form">
                  <Switch
                    label="Hide headers"
                    labelClass={`width-${LABEL_WIDTH}`}
                    onChange={this.handleHideHeadersChange}
                    checked={options.hideHeaders}
                  />
                </div>
                <div className="gf-form">
                  <FormSelect
                    label="Group by label"
                    labelWidth={LABEL_WIDTH}
                    selectWidth={FORM_ELEMENT_WIDTH}
                    onChange={this.handleGroupBySelect}
                    value={options.groupByLabel}
                    options={selectOptions}
                  />
                  {loading ? this.renderErrorInfo('Loading series') : labels.length === 0 && this.renderErrorInfo('No series provided', true)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
