import {
  BooleanField,
  BooleanInput,
  DateInput,
  FormWithRedirect,
  ListButton,
  ReferenceArrayInput,
  SaveButton,
  SelectArrayInput,
  TextInput,
} from 'react-admin'
import { Box, Toolbar, Typography } from '@material-ui/core'
import TwoElementRow from './TwoElementRow'
import Spacer from './Spacer'

const DepotForm = (props) => (
  <FormWithRedirect
    {...props}
    render={(formProps) => (
      <form>
        <Box p="1em">
          <Box display="flex">
            {/*main*/}
            <Box flex={80} mr="2rem">
              <TwoElementRow
                left={
                  <TextInput
                    label="id"
                    fullWidth
                    variant="standard"
                    source="id"
                    margin="none"
                    disabled
                  />
                }
                right={
                  <TextInput
                    margin="none"
                    variant="standard"
                    fullWidth
                    source="name"
                  />
                }
                ratio={20}
              />
              <TextInput
                fullWidth
                variant="standard"
                multiline
                margin="none"
                source="email"
              />
              <TextInput
                margin="none"
                fullWidth
                variant="standard"
                source="phone"
              />
              <Spacer />
              <BooleanInput
                margin="none"
                fullWidth
                variant="standard"
                source="adminEmailNotifications"
              />
              <ReferenceArrayInput
                fullWidth
                margin="none"
                variant="standard"
                source="roles"
                reference="admin/roles"
              >
                <SelectArrayInput translateChoice={false} optionText="name" />
              </ReferenceArrayInput>
            </Box>
            {/*admin*/}
            <Box flex={20} ml="2rem">
              <Typography variant="h6" gutterBottom>
                Admin
              </Typography>
              <Box
                display="flex"
                style={{ color: 'rgba(0, 0, 0, 0.38)', marginBottom: '1rem' }}
              >
                Verified:&nbsp;&nbsp;
                <BooleanField
                  fullWidth
                  margin="none"
                  multiline
                  variant="standard"
                  record={props.record}
                  source="isVerified"
                  disabled
                />
              </Box>
              <TextInput
                variant="standard"
                fullWidth
                disabled
                margin="none"
                source="origin"
                disabled
              />
              <TextInput
                variant="standard"
                fullWidth
                disabled
                margin="none"
                source="baseurl"
                disabled
              />
              <DateInput
                variant="standard"
                fullWidth
                disabled
                margin="none"
                label="Created"
                source="createdAt"
              />
              <DateInput
                variant="standard"
                fullWidth
                disabled
                margin="none"
                label="Updated"
                source="updatedAt"
              />
            </Box>
          </Box>
        </Box>
        <Toolbar>
          <Box display="flex" width="100%" justifyContent="flex-end">
            <ListButton
              basePath={props.basePath}
              label="Cancel"
              icon={null}
              variant="filled"
              style={{ marginRight: '2rem' }}
            />
            <SaveButton
              saving={formProps.saving}
              handleSubmitWithRedirect={formProps.handleSubmitWithRedirect}
            />
          </Box>
        </Toolbar>
      </form>
    )}
  />
)

export default DepotForm