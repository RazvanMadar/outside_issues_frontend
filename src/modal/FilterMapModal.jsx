import React, { useRef } from "react";
import {
  Button,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import { filterIssues } from "../api/issue-api";

// asta nu merge inca
// const FilterMapModal = ({ open, onClose, func }) => {
//   const typeInputRef = useRef();
//   const stateInputRef = useRef();
//   const dateInputRef = useRef();

//   const filterAlIssues = () => {
//     const enteredType = typeInputRef.current.value;
//     const enteredState = stateInputRef.current.value;
//     const enteredDate = dateInputRef.current.value;

//     return filterIssues(
//       enteredType,
//       enteredState,
//       enteredDate,
//       (result, status, err) => {
//         if (result !== null && status === 201) {
//           console.log(result);
//           func(newUser);
//           onClose();
//         } else {
//           console.log(err);
//         }
//       }
//     );
//   };

//   if (!open) return null;
//   return (
//     <div>
//       <Modal isOpen={true}>
//         <ModalHeader>Filter issues</ModalHeader>
//         <ModalBody>
//           <Form>
//             <FormGroup>
//               <Label for="text">Firstname</Label>
//               <Input
//                 id="firstname"
//                 placeholder="Insert firstname"
//                 name="firstname"
//                 type="text"
//                 innerRef={firstnameInputRef}
//               />
//             </FormGroup>
//             <FormGroup>
//               <Label for="text">Lastname</Label>
//               <Input
//                 id="lastname"
//                 placeholder="Insert lastname"
//                 name="lastname"
//                 type="text"
//                 innerRef={lastnameInputRef}
//               />
//             </FormGroup>
//             <FormGroup>
//               <Label for="email">Email</Label>
//               <Input
//                 id="email"
//                 placeholder="Insert email"
//                 name="password"
//                 type="email"
//                 innerRef={emailInputRef}
//               />
//             </FormGroup>
//             <FormGroup>
//               <Label for="password">Password</Label>
//               <Input
//                 id="password"
//                 name="password"
//                 placeholder="Insert password"
//                 type="password"
//                 innerRef={passwordInputRef}
//               />
//             </FormGroup>
//           </Form>
//         </ModalBody>
//         <ModalFooter>
//           <Button color="primary" onClick={addUser}>
//             Add
//           </Button>
//           <Button color="secondary" onClick={onClose}>
//             Cancel
//           </Button>
//         </ModalFooter>
//       </Modal>
//       ;
//     </div>
//   );
// };

// export default FilterMapModal;
