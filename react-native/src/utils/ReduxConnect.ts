import { connect } from 'react-redux';
import { RootState } from '../types';

interface ConnectToReduxParams {
  component: React.ComponentType<any>;
  stateProps?: (state: RootState) => any;
  dispatchProps?: any;
}

export function connectToRedux({ component, stateProps = () => ({}), dispatchProps = () => ({}) }: ConnectToReduxParams) {
  const mapStateToProps = (state: RootState) => stateProps(state);

  const mapDispatchToProps = dispatchProps;

  return connect(mapStateToProps, mapDispatchToProps)(component);
}
