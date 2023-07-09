// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract Portfolio {
    struct Project{
        uint id;
        string name;
        string description;
        string image;
        string githublink;
    }

    struct Education{
        uint id;
        string date;
        string degree;
        string knowledgeAcquired;
        string institutionName;
    }
    struct Experience{
        uint id;
        string date;
        string title;
        string description;
        string skills;
    }
    Project[3] public projects;
    Education[3] public educationDetails;
    Experience[3] public experienceDetails;

    string public imageLink="bafybeidbe3l3uje46x7goznkhtqsz7ivew4yf466eu3tlir7opq37s4goq";
    string public description="Over 6 months experience in Solidity and Frontend Developer";
    string public resumeLink="bafkreieu7bgzh62t4pmah7talqn6xrjjcn5m6g2juvazssd32jknfzhvwe";
    uint projectCount;
    uint educationCount;
    uint experienceCount;
    address public manager;

    constructor(){
        manager=msg.sender;

    }

    modifier  onlyManager() {
        require(manager==msg.sender,"You are not the manager");
        _;
    }

    function insertProject(string calldata _name,string calldata _description,string calldata _image,string calldata _githublink) external onlyManager {
        require(projectCount<3,"3 project allowed");
        projects[projectCount] = Project(projectCount,_name,_description,_image,_githublink);
        projectCount++;
    }
    function changeProject(string calldata _name,string calldata _description,string calldata _image,string calldata _githublink,uint _projectCount) external onlyManager{
        require( _projectCount>=0 && _projectCount<3,"3 project allowed");
        projects[_projectCount] = Project(_projectCount,_name,_description,_image,_githublink);

    }

    function allProjects() external  view returns(Project[3] memory){
        return projects;
    }

    function insertEducation(string calldata _date,string calldata _degree, string calldata _knowledgeAcquired, string calldata _institutionName) external onlyManager{
        require(educationCount<3,"3 allowed");
        educationDetails[educationCount] = Education(educationCount,_date,_degree,_knowledgeAcquired,_institutionName);
        educationCount++;
    }

    function changeEducation(string calldata _date,string calldata _degree, string calldata _knowledgeAcquired, string calldata _institutionName,uint _educationCount)external onlyManager{
        require(_educationCount>=0 && _educationCount<3,"3 allowed");
                educationDetails[_educationCount] = Education(_educationCount,_date,_degree,_knowledgeAcquired,_institutionName);


    }

    function allEducation() external view  returns(Education[3] memory){
        return educationDetails; 
    }
       function insertExperience(string calldata _date,string calldata _title, string calldata _description, string calldata _skills) external onlyManager{
        require(experienceCount<3,"3 allowed");
        experienceDetails[experienceCount] = Experience(experienceCount,_date,_title,_description,_skills);
        experienceCount++;
    }

    function changeExperience(string calldata _date,string calldata _title, string calldata _description, string calldata _skills,uint _experienceCount)external onlyManager {
        require(_experienceCount>=0 && _experienceCount<3,"3 allowed");
        experienceDetails[_experienceCount] = Experience(_experienceCount,_date,_title,_description,_skills);
    }

    function allExperience() external view  returns(Experience[3] memory){
        return experienceDetails; 
    }
    function changeDescription(string calldata _description) external onlyManager{
        description=_description;
    }
      function changeResume(string calldata _resumeLink) external onlyManager{
        resumeLink=_resumeLink;
    }
    
      function changeImage(string calldata _imageLink) external onlyManager{
        imageLink=_imageLink;
    }

    function donate() public payable {
        payable(manager).transfer(msg.value);
    }
    
}