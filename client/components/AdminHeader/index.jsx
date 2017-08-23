import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchPhase } from '../../actions/userActions';
import Header from '../Header/index.jsx';
import CubeLoader from '../Decorative/CubeLoader/CubeLoader';

require('./_index.scss');

const mapPhases = (phase) => {
  const phases = ['Registracija', 'Takmicenje', 'Glasanje', 'Kraj'];
  return phases[phase];
};

class AdminHeader extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  componentWillMount() {
    this.props.$fetchPhase();
  }

  render() {
    return (
      <div>
        <Header>
          <span className="admin-header-period">
            <span className="period">Period:</span>
            { this.props.isFetching && <CubeLoader /> }
            { !this.props.isFetching && !this.props.phaseError && mapPhases(this.props.phase) }
            {
              !this.props.isFetching &&
              this.props.phaseError &&
              <span>{this.props.phaseError}</span>
            }
          </span>
        </Header>
      </div>
    );
  }
}

AdminHeader.propTypes = {
  phase: PropTypes.number.isRequired,
  $fetchPhase: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  phaseError: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
};

const mapStateToProps = (state) => ({
  phase: state.user.phase,
  isFetching: state.user.isFetching,
  phaseError: state.user.phaseError
});

export default connect(mapStateToProps, { $fetchPhase: fetchPhase })(AdminHeader);

