import JsonReporter from './JsonReporter';
import YamlReporter from './YamlReporter';

const reporters = {
  json: JsonReporter,
  yaml: YamlReporter
};

export default reporters;
