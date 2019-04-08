<ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
  <View style={styles.welcomeContainer}>
    <Text style={styles.getStartedText}>
      Welcome to the Idea Bucket!
    </Text>
    <View style={{width:300, alignSelf: 'center'}}>
      <CardSection style={{backgroundColor:'rgba(224, 0, 48, 0)', borderBottomWidth: 0}}>
        <Input
          label="Name"
          placeholder="Awesome Project"
          onChangeText={this.projectName.bind(this)}
          value={this.props.project_name}
          style={{backgroundColor:'#fff'}}
        />
      </CardSection>
      <CardSection style={{backgroundColor:'rgba(224, 0, 48, 0)', borderBottomWidth: 0}}>
        <Input
          label="Description"
          placeholder="An awesome app..."
          secureTextEntry={true}
          onChangeText={this.projectDescription.bind(this)}
          value={this.props.project_description}
          style={{backgroundColor:'#fff'}}
        />
      </CardSection>
    </View>
    <Button
    onPress={this.createProject.bind(this)}
    title='CREATE' />
    <Button
    onPress={this.updateProject.bind(this)}
    title='UPDATE' />
    <Button
    onPress={this.deleteProject.bind(this)}
    title='DELETE' />
  </View>
</ScrollView>
