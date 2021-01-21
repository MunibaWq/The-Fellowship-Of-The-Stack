//Add A Color Modal

import { ColorInput, Input } from "../../components/Reusable/Input";
import { Modal, ModalTitle } from "../../components/Reusable/Modal";
import Button from "../../components/Reusable/Button";
<Modal width="330px">
<ModalTitle>Add A Color Option</ModalTitle>
<label htmlFor="colorInput">Click To Choose Color</label>
<ColorInput id="colorInput" />
<label htmlFor="colorName">Color Name</label>
<Input />
<Button primary>Add Option</Button>
</Modal>