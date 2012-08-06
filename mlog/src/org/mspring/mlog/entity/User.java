/**
 * 
 */
package org.mspring.mlog.entity;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;

import org.hibernate.search.annotations.Field;
import org.hibernate.search.annotations.Index;
import org.hibernate.search.annotations.Store;

/**
 * @author Gao Youbo
 * @since 2012-7-12
 * @Description
 * @TODO
 */
@Entity
@Table(name = "user")
public class User implements Serializable {
    /**
     * 
     */
    private static final long serialVersionUID = 8157984937647606877L;
    private Long id;
    private String name;
    private String alias;
    private String password;
    private String email;
    private Date createTime;

    private boolean rememberMe;

    /**
     * @return the id
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", unique = true, nullable = false, length = 30)
    public Long getId() {
        return id;
    }

    /**
     * @param id
     *            the id to set
     */
    public void setId(Long id) {
        this.id = id;
    }

    /**
     * @return the name
     */
    @Column(name = "name", unique = true, nullable = false, length = 100)
    @Field(index = Index.TOKENIZED, store = Store.YES)
    public String getName() {
        return name;
    }

    /**
     * @param name
     *            the name to set
     */
    public void setName(String name) {
        this.name = name;
    }

    /**
     * @return the alias
     */
    @Column(name = "alias", unique = true, nullable = false, length = 100)
    @Field(index = Index.TOKENIZED, store = Store.YES)
    public String getAlias() {
        return alias;
    }

    /**
     * @param alias
     *            the alias to set
     */
    public void setAlias(String alias) {
        this.alias = alias;
    }

    /**
     * @return the password
     */
    @Column(name = "password", nullable = false, length = 100)
    public String getPassword() {
        return password;
    }

    /**
     * @param password
     *            the password to set
     */
    public void setPassword(String password) {
        this.password = password;
    }

    /**
     * @return the email
     */
    @Column(name = "email", length = 200, nullable = false)
    @Field(index = Index.TOKENIZED, store = Store.YES)
    public String getEmail() {
        return email;
    }

    /**
     * @param email
     *            the email to set
     */
    public void setEmail(String email) {
        this.email = email;
    }

    /**
     * @return the createTime
     */
    @Column(name = "create_time", length = 100, nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    public Date getCreateTime() {
        return createTime;
    }

    /**
     * @param createTime
     *            the createTime to set
     */
    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    /**
     * @return the rememberMe
     */
    @Transient
    public boolean isRememberMe() {
        return rememberMe;
    }

    /**
     * @param rememberMe
     *            the rememberMe to set
     */
    public void setRememberMe(boolean rememberMe) {
        this.rememberMe = rememberMe;
    }

}
